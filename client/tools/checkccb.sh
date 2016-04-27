#!/bin/bash

cd ../res/ccbi
for f in *.ccbi; do 
    result=$(grep $f -R ../../src/js)
    if [[ -z "$result" ]]; then
        echo $f
    fi
done 


cd ../../tools
while read line; do
    result=$(grep $line -R ../src/js)
    if [[ -z "$result" ]]; then
        echo $line
    fi
done < "log"
