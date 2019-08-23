cat app.json | \
sed s/phone_icon_android.png/phone_icon_android_debug.png/ | \
sed s/phone_icon_ios.png/phone_icon_ios_debug.png/ | \
sed s/org.peacegeeks.ArrivalAdvisor/org.peacegeeks.ArrivalAdvisorDebug/ > temp.json && \
mv temp.json app.json

yarn cbt