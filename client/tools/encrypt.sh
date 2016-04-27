#!/bin/bash
path=`dirname $0`
$path/convert.py
if [[ $? != 0 ]] ; then
    exit $?
fi
