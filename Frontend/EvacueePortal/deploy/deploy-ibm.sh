#!/bin/sh

CRETE=${1:-undef}

cd ..
npm install
npm run build

rm -rf pack/dist
mkdir pack/dist
mkdir pack/dist/css
mkdir pack/dist/js

cat ./dist/index.html | sed -e 's/\/css\/app.\w*/'${ACTION_NAME}'\/css\/app/g' -e 's/\/css\/chunk-vendors.\w*/'${ACTION_NAME}'\/css\/chunk-vendors/g' -e 's/\/js\/chunk-vendors.\w*/'${ACTION_NAME}'\/js\/chunk-vendors/g' -e 's/\/js\/app.\w*/'${ACTION_NAME}'\/js\/app/g' > ./pack/dist/index.html
cp dist/css/app.*.css pack/dist/css/app.css
cp dist/css/chunk-vendors.*.css pack/dist/css/chunk-vendors.css
cp dist/js/app.*.js pack/dist/js/app.js
cp dist/js/chunk-vendors.*.js pack/dist/js/chunk-vendors.js

cd pack
npm install
zip -r app.zip .

ibmcloud login --apikey $API_KEY
ibmcloud target -r $TARGET_REGION -g $TARGET_RESOURCE_GROUP
ibmcloud fn property set --namespace $TARGET_NAMESPACE

if [ "${CREATE}" = "undef" ]; then
  ibmcloud fn package create $TARGET_PACKAGE
  ibmcloud fn action create $TARGET_PACKAGE/$ACTION_NAME app.zip --kind nodejs:10 --web raw
else
  ibmcloud fn action update $TARGET_PACKAGE/$ACTION_NAME app.zip --kind nodejs:10 --web raw
fi
