/**
 * Created by hortor on 16/3/28.
 */
var crypto = require('crypto');


module.exports.create = function(uid, channel, channelToken, timestamp, pwd) {
    if (!channelToken) channelToken = "";
    if (!channel) channel = "";
    var msg = uid  + '|' + channel + '|' + channelToken + '|' +timestamp;
    var cipher = crypto.createCipher('aes256', pwd);
    var enc = cipher.update(msg, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

module.exports.parse = function(token, pwd) {
    var decipher = crypto.createDecipher('aes256', pwd);
    var dec;
    try {
        dec = decipher.update(token, 'hex', 'utf8');
        dec += decipher.final('utf8');
    } catch(err) {
        console.error('[token] fail to decrypt token. %j', token);
        return null;
    }
    var ts = dec.split('|');
    if(ts.length !== 4) {
        // illegal token
        return null;
    }
    return {uid: ts[0], channel : ts[1], channelToken : ts[2], timestamp: Number(ts[3])};
};