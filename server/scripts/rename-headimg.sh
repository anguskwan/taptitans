#!/bin/bash

i=0
for f in ../static/headimg/*; do
    mv $f ../static/headimg/headimg$i.jpg
    i=$((i+1))
done
