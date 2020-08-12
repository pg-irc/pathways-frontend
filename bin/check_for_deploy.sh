if [ -d ../pathways-deploy/ ] || [ -d ../*/pathways-deploy/ ]; then
    echo "../pathways-deploy or ../*/pathways-deploy exists, confirm with 'yes' to continue the build"
    read answer
    if [ "$answer" = "yes" ]; then
        exit 0
    else
        exit -1
    fi
fi
exit 0
