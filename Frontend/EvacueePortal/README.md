Evacuee Portal
==============

This is a web app for evacuees.
After a natural disaster happens, home evacuees open this web app from the link sent by the local government.
They can share their names, evacuation location, and family status with the local government.
They can also request supplies they need.
It helps local governments to understand the reality of home evacuees.


## Getting started

### Preparation

Install packages with npm.

```
npm install
```

#### Create .env file

After refer [Functions deployment]() and get <API_ID>, <API_Secret> and <API_URL>, 
you create .env file in the workspace and write down following statement.

.env
```
VUE_APP_IBM_CLIENT_ID2=<API_ID>
VUE_APP_IBM_CLIENT_SECRET2=<API_Secret>
VUE_APP_IBM_CLIENT_URL2=<API_URL>
```


### Run app for development

You can build this application with following command.

```
npm run serve
```


## Deploy this application on IBM cloud Functions

### Set env for deployment

Set the following environmental vars. You can find these values in IBM Cloud portal.

```
export API_KEY=<API_KEY>
export TARGET_REGION=<TARGET_REGION>
export TARGET_RESOURCE_GROUP=<TARGET_RESOURCE_GROUP>
export TARGET_NAMESPACE=<TARGET_NAMESPACE>
export TARGET_PACKAGE=<TARGET_PACKAGE>
export ACTION_NAME=<ACTION_NAME>
```

### Deploy this application

```
cd deploy
./deploy-ibm.sh
```

You can find URL for this application on Cloud Functions management page in IBM Cloud portal.

