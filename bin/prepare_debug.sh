cat app.json | \
sed s/phone_icon_android.png/phone_icon_android_debug.png/ | \
sed s/phone_icon_ios.png/phone_icon_ios_debug.png/ | \
sed s/org.peacegeeks.ArrivalAdvisor/org.peacegeeks.ArrivalAdvisorDebug/ > temp.json && \
mv temp.json app.json

echo "VERSION=1.2.0"                                        >  "./.env"
echo "SENTRY_AUTH_TOKEN=your auth token"                    >> "./.env"
echo "API_URL='https://fierce-ravine-89308.herokuapp.com'"  >> "./.env"
echo "GOOGLE_ANALYTICS_TRACKING_ID='UA-30770107-6'"         >> "./.env"
echo "DEBUG_GOOGLE_ANALYTICS=false"                         >> "./.env"

yarn cbt