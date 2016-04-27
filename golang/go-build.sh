#!/bin/bash
ROOT_DIR="$( cd "$( dirname "$0" )" && pwd )"
export GOPATH=$ROOT_DIR

echo '**********'
echo "GOPATH: $GOPATH"
echo '**********'

echo '编译代码...'
go install taptitans_auth
if [ $? == 0 ];then
	echo 'build成功'
fi
