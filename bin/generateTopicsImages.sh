#!/bin/sh

path='../src/application/topicsImages.ts'

echo "export const topicsImages = {" >> $path
for f in ../assets/images/topics/*.png; do
    filename=$(basename "$f" | cut -d. -f1) 
    echo "'$filename' : require('../../assets/images/topics/$filename.png')," >> $path
done
echo "};" >> $path