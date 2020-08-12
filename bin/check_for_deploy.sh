if [ -d ../pathways-deploy/ ] || [ -d ../*/pathways-deploy/ ]; then
    echo "deploy folders found, these should not be there during regular development work:"
    ls -d ../pathways-deploy* ../*/pathways-deploy 2> /dev/null
    echo "confirm with 'yes' to continue the build"
    read answer
    if [ "$answer" = "yes" ]; then
        exit 0
    else
        exit -1
    fi
fi
exit 0
