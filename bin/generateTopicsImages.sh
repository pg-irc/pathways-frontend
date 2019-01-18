#!/bin/sh

echo "export const topicsImages: any = {"
for f in $1; do
    filename=$(basename $f .png)
    echo "'$filename' : require('../../assets/images/topics/$filename.png'),"
done
echo "};"
