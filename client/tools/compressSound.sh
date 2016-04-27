#!/bin/bash

TOOLDIR="$( cd "$( dirname "$0" )" && pwd )"

echo "TOOLDIR:$TOOLDIR"

TOOL="$TOOLDIR/enhAacPlusEnc"

mkdir output

for mp3 in *.mp3; do
    wav="output/${mp3/%mp3/wav}"
    # decompress mp3 to wav
    ffmpeg -v quiet -y -i "$mp3" "$wav"
done 

cp *.wav output/

for wav in output/*.wav; do
    aac="${wav/wav/aac}"
    m4a="${wav/wav/m4a}"
    
    # encode wav to aac using AAC HE v2 codec in raw adts format
    $TOOL "$wav" "$aac" 32000 s 1> /dev/null 2> /dev/null
    $TOOL "$wav" "$aac" 32000 m 1> /dev/null 2> /dev/null
    # ffmpeg -i "$wav" -c:a libfdk_aac -profile:a aac_he -b:a 64k "$m4a2";
    
    # warp raw adts aac into mp4 container for android 2 compatibility
    mp4box -add "$aac" "$m4a"

    #rm "$wav"
    rm "$aac"
done 