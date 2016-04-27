#!/bin/bash

if [ "$2" == "pull" ] ; then
    echo "pull"

    cd /home/dev/code/lianliankan/resource
    git stash
    git clean -xfd

    cd /home/dev/code/lianliankan/client/res
    git clean -xfd

    cd /home/dev/code/lianliankan
    git stash
    git pull origin $1
    git submodule update
fi

cd /home/dev/code/lianliankan/client

cp /home/whitecloud/连连看/tmx/* ./res/tiledmap/ 2>/dev/null || :
cp /home/whitecloud/连连看/conf/* ./res_raw/conf/ 2>/dev/null || :
grunt e2j
cd ../resource
python update.py 4.2
