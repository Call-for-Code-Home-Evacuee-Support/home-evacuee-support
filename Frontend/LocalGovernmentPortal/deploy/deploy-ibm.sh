#!/bin/sh

set -eu

if [ $# -lt 11 ]; then
        echo "usage:"
  echo "./deploy-ibm.sh REGION RESOURCE_GROUP NAMESPACE PACKAGE ACTION CREATE_IF_WANT_TO_CREATE TENANT_ID CLIENT_ID SECRET OAUTH_SERVER_URL REDIRECT_URI ROOT_PATH"
        exit 1
fi

if [ -z "${API_KEY}" ]; then
  echo "To login IBM Cloud, Please put your API_KEY into your environment variables"
  exit 1
fi

REGION=$1
RESOURCE_GROUP=$2
NAMESPACE=$3
PACKAGE=$4
ACTION=$5
CREATE=${6:-undef}


TENANT_ID=$7
CLIENT_ID=$8
SECRET=$9
OAUTH_SERVER_URL=${10}
REDIRECT_URI=${11}
ROOT_PATH=${12}

echo ${ROOT_PATH}

cd ..

npm install
npm run build

rm -rf pack/dist
mkdir pack/dist
mkdir pack/dist/css
mkdir pack/dist/js

cat ./dist/index.html | sed -e 's/\/css\/app.\w*/css\/app/g' -e 's/\/css\/chunk-vendors.\w*/css\/chunk-vendors/g' -e 's/\/js\/chunk-vendors.\w*/js\/chunk-vendors/g' -e 's/\/js\/app.\w*/js\/app/g' > ./pack/dist/index.html
cp dist/css/app.*.css pack/dist/css/app.css
cp dist/css/chunk-vendors.*.css pack/dist/css/chunk-vendors.css
cp dist/js/app.*.js pack/dist/js/app.js
cp dist/js/chunk-vendors.*.js pack/dist/js/chunk-vendors.js

cat ./pack/server.js | sed -e "s@process.env.ROOT_PATH@\"${ROOT_PATH}\"@" -e "s@process.env.TENANT_ID@\"${TENANT_ID}\"@" -e "s@process.env.CLIENT_ID@\"${CLIENT_ID}\"@" -e "s@process.env.SECRET@\"${SECRET}\"@" -e "s@process.env.OAUTH_SERVER_URL@\"${OAUTH_SERVER_URL}\"@" -e "s@process.env.REDIRECT_URI@\"${REDIRECT_URI}\"@" > ./pack/server-app.js

cd pack
npm install
zip -r app.zip .

ibmcloud login --apikey ${API_KEY}
ibmcloud target -r ${REGION} -g ${RESOURCE_GROUP}
ibmcloud fn property set --namespace ${NAMESPACE}
if [ "${CREATE}" = "undef" ]; then
  ibmcloud fn action update ${PACKAGE}/${ACTION} app.zip --kind nodejs:10 --web raw
else
  ibmcloud fn package create ${PACKAGE}
  ibmcloud fn action create ${PACKAGE}/${ACTION} app.zip --kind nodejs:10 --web raw
fi
