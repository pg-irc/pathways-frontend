#!/bin/sh
echo "Release checklist (run from project root)"
echo "*************************"
echo "Running tests:"
echo "*************************"
yarn test
echo "*************************"
echo "Expo information:"
echo "*************************"
expo w
echo "*************************"
echo "Environment variables:"
echo "*************************"
cat .env
echo "*************************"
echo "Summary:"
echo "*************************"
echo "If everything looks good,\n
      To build iOS run: expo bi --release-chanel production\n
      To build Android run: expo ba --release-chanel production"