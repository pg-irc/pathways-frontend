#!/bin/sh

echo "export const images: any = {"
for f in $@; do
    filename=$(basename $f .png)
    dirname=$(dirname $f)
    echo -e "\t'$filename' : require('../../$dirname/$filename.png'),"
done
echo "};"
