package db

import (
	"bytes"
	"encoding/gob"
	"errors"
	"reflect"
	"time"

	"github.com/garyburd/redigo/redis"
)

const (
	DefaultMaxIdleSize = 10
	DefaultIdleTimeout = 60 * time.Second
	DefaultMaxAge      = 2 * 60 * 60 // 2 hours
	DefaultMaxLength   = 4096        // 4K bytes
)

type RedisPool interface {
	ActiveCount() int
	Close() error
	Get() redis.Conn
}

type RedisOption struct {
	Pool      RedisPool
	maxAge    int
	maxLength int
}

type RedisDB struct {
	Option *RedisOption
}

func NewRedisOption(network, address, password string) (option *RedisOption) {
	pool := &redis.Pool{
		MaxIdle:     DefaultMaxIdleSize,
		IdleTimeout: DefaultIdleTimeout,
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do("PING")
			return err
		},
		Dial: func() (redis.Conn, error) {
			return dial(network, address, password)
		},
	}
	option = &RedisOption{
		Pool:      pool,
		maxAge:    DefaultMaxAge,
		maxLength: DefaultMaxLength,
	}
	return
}

func (op *RedisOption) Close() (err error) {
	if op.Pool != nil {
		err = op.Pool.Close()
	}
	return
}

func (op *RedisOption) SetMaxAge(age int) {
	if age >= 0 {
		op.maxAge = age
	}
}

func (op *RedisOption) SetMaxLength(length int) {
	if length >= 0 {
		op.maxLength = length
	}
}

func NewRedisDBWithOption(option *RedisOption) (db *RedisDB, err error) {
	db = &RedisDB{
		Option: option,
	}
	_, err = db.ping()
	return db, err
}

func (db *RedisDB) Load(key string, val interface{}) (found bool, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err := conn.Err(); err != nil {
		return false, err
	}
	reply, err := conn.Do("GET", key)
	if err != nil {
		return false, err
	}
	if reply == nil {
		return false, nil // no reply was associated with this key
	}
	switch val.(type) {
	case *int, *uint, *int32, *uint32, *int64, *uint64:
		num, err := redis.Int64(reply, err)
		if err != nil {
			return false, err
		}
		rv := reflect.ValueOf(val)
		p := rv.Elem()
		p.SetInt(num)
	default:
		b, err := redis.Bytes(reply, err)
		if err != nil {
			return false, err
		}

		decoder := gob.NewDecoder(bytes.NewBuffer(b))
		err = decoder.Decode(val)
	}

	return true, err
}

func (db *RedisDB) Save(key string, val interface{}) (err error) {
	var storeValue interface{}
	switch val.(type) {
	case int, uint, int32, uint32, int64, uint64:
		storeValue = val
	default:
		buf := new(bytes.Buffer)
		encoder := gob.NewEncoder(buf)
		err = encoder.Encode(val)
		if err != nil {
			return err
		}
		if db.Option.maxLength != 0 && buf.Len() > db.Option.maxLength {
			return errors.New("RedisDB: the value to store is too big")
		}
		storeValue = buf.Bytes()
	}

	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err = conn.Err(); err != nil {
		return err
	}
	if db.Option.maxAge == 0 {
		_, err = conn.Do("SET", key, storeValue)
	} else {
		_, err = conn.Do("SET", key, storeValue, "EX", db.Option.maxAge)
	}
	return err
}

func (db *RedisDB) SaveEx(key string, val interface{}, maxAge int) (err error) {
	var storeValue interface{}
	switch val.(type) {
	case int, uint, int32, uint32, int64, uint64:
		storeValue = val
	default:
		buf := new(bytes.Buffer)
		encoder := gob.NewEncoder(buf)
		err = encoder.Encode(val)
		if err != nil {
			return err
		}
		if db.Option.maxLength != 0 && buf.Len() > db.Option.maxLength {
			return errors.New("RedisDB: the value to store is too big")
		}
		storeValue = buf.Bytes()
	}

	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err = conn.Err(); err != nil {
		return err
	}
	if maxAge == 0 {
		_, err = conn.Do("SET", key, storeValue)
	} else {
		_, err = conn.Do("SET", key, storeValue, "EX", maxAge)
	}
	return err
}

func (db *RedisDB) GetString(key string) (content string, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err = conn.Err(); err != nil {
		return
	}
	content, err = redis.String(conn.Do("GET", key))
	return
}

func (db *RedisDB) SetString(key string, content string) (err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err = conn.Err(); err != nil {
		return
	}
	_, err = conn.Do("SET", key, content)
	return
}

func (db *RedisDB) Increase(key string) (counter int64, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	counter, err = redis.Int64(conn.Do("INCR", key))
	return
}

func (db *RedisDB) Delete(key string) (err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if _, err = conn.Do("DEL", key); err != nil {
		return err
	}
	return nil
}

func (db *RedisDB) Keys(pattern string) (keys []string, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	values, err := redis.Values(conn.Do("KEYS", pattern))
	if err != nil {
		return nil, err
	}
	err = redis.ScanSlice(values, &keys)
	return
}

func (db *RedisDB) SAdd(key string, member string) (err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if _, err = conn.Do("SADD", key, member); err != nil {
		return err
	}
	return nil
}

func (db *RedisDB) SMembers(key string) (members []string, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	values, err := redis.Values(conn.Do("SMEMBERS", key))
	if err != nil {
		return nil, err
	}
	err = redis.ScanSlice(values, &members)
	return
}

func (db *RedisDB) SINTER(keys...string) (members []string, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	args := redis.Args{}
	values, err := redis.Values(conn.Do("SINTER", args.AddFlat(keys)...))
	if err != nil {
		return nil, err
	}
	err = redis.ScanSlice(values, &members)
	return
}

func (db *RedisDB) SDIFF(keys...string) (members []string, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	args := redis.Args{}
	values, err := redis.Values(conn.Do("SDIFF", args.AddFlat(keys)...))
	if err != nil {
		return nil, err
	}
	err = redis.ScanSlice(values, &members)
	return
}

func (db *RedisDB) ZAdd(key string, score float64, member string) (err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if _, err = conn.Do("ZADD", key, score, member); err != nil {
		return err
	}
	return nil
}

func (db *RedisDB) ZRem(key string, member string) (err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if _, err = conn.Do("ZREM", key, member); err != nil {
		return err
	}
	return nil
}

func (db *RedisDB) MGetBytes(keys []string) (bs [][]byte, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err = conn.Err(); err != nil {
		return
	}
	args := redis.Args{}
	var values []interface{}
	values, err = redis.Values(conn.Do("MGET", args.AddFlat(keys)...))
	var b []byte
	for _, v := range values {
		if v != nil {
			if b, err = redis.Bytes(v, err); err != nil {
				continue
			}
			bs = append(bs, b)
		}
	}
	err = nil
	return
}

func (db *RedisDB) MGetOrigin(keys []string) (values []interface{}, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err = conn.Err(); err != nil {
		return
	}
	args := redis.Args{}
	values, err = redis.Values(conn.Do("MGET", args.AddFlat(keys)...))
	return values, err
}

func (db *RedisDB) ZRevRange(key string, start, stop int64, val interface{}) (err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err := conn.Err(); err != nil {
		return err
	}
	values, err := redis.Values(conn.Do("ZREVRANGE", key, start, stop, "WITHSCORES"))
	if err != nil {
		return err
	}
	err = redis.ScanSlice(values, val)
	return
}

func (db *RedisDB) ZRangeByScore(key string, start, stop int64, val interface{}) (err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err := conn.Err(); err != nil {
		return err
	}
	values, err := redis.Values(conn.Do("ZRANGEBYSCORE", key, start, stop, "WITHSCORES"))
	if err != nil {
		return err
	}
	err = redis.ScanSlice(values, val)
	return
}

func (db *RedisDB) ZRevRank(key string, member string) (found bool, rank int64, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err := conn.Err(); err != nil {
		return false, 0, err
	}
	found = true
	rank, err = redis.Int64(conn.Do("ZREVRANK", key, member))
	if err == redis.ErrNil {
		return false, 0, nil
	}
	return
}

func (db *RedisDB) ZRevRanks(key string, members []string) (founds []bool, ranks []int64, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err := conn.Err(); err != nil {
		return nil, nil, err
	}
	for _, m := range members {
		conn.Send("ZREVRANK", key, m, "WITHSCORES")
	}
	conn.Flush()
	var rank int64
	for i, _ := range members {
		rank, err = redis.Int64(conn.Receive())
		if err == redis.ErrNil {
			founds[i] = false
			ranks[i] = 0
		} else {
			founds[i] = true
			ranks[i] = rank
		}
	}
	err = nil
	return
}

func (db *RedisDB) ZScore(key string, member string) (found bool, score float64, err error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	if err := conn.Err(); err != nil {
		return false, 0, err
	}
	found = true
	score, err = redis.Float64(conn.Do("ZSCORE", key, member))
	if err == redis.ErrNil {
		return false, 0, nil
	}
	return
}

func dial(network, address, password string) (redis.Conn, error) {
	c, err := redis.Dial(network, address)
	if err != nil {
		return nil, err
	}
	if password != "" {
		if _, err := c.Do("AUTH", password); err != nil {
			c.Close()
			return nil, err
		}
	}
	return c, err
}

func (db *RedisDB) ping() (bool, error) {
	conn := db.Option.Pool.Get()
	defer conn.Close()
	data, err := conn.Do("PING")
	if err != nil || data == nil {
		return false, err
	}
	return (data == "PONG"), nil
}
