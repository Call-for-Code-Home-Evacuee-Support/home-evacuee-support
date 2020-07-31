Local Government Portal
=======================

This is a web portal for local government. Evacuees are located via map view and filters can be applied according to evacuee status. Evacuees can also be filtered based on their evacuation center area. There is 'Supply Distribution Plan' tab for calculating distribution plan of the supplies to evacuees, and a 'Each Evacuee Supply List' Tab to search for evacuees.


## Getting started

### Preparation

Install packages with npm.

```
npm install
```

### Create .env file and store API key, API secret and API urls

.env file
```
VUE_APP_IBM_CLIENT_ID2=<API_ID>
VUE_APP_IBM_CLIENT_SECRET2=<API_Secret>
VUE_APP_IBM_CLIENT_URL2=<API_URL>
```

### Run app for development

You can build this application with the following command.

```
npm run serve
```


## Deploy this application on IBM cloud Functions

Execute the following script to deploy this application on Cloud Functions.

```
cd deploy
./deploy-ibm.sh REGION RESOURCE_GROUP NAMESPACE PACKAGE ACTION CREATE_IF_WANT_TO_CREATE TENANT_ID CLIENT_ID SECRET OAUTH_SERVER_URL REDIRECT_URI ROOT_PATH

```

The following values are related to Cloud Functions.

* REGION
* RESOURCE_GROUP
* NAMESPACE
* PACKAGE
* ACTION

The following values are related to App ID, becuase this appication authenticates a request with App ID.

* TENANT_ID
* CLIENT_ID
* SECRET
* OAUTH_SERVER_URL
* REDIRECT_URI
* ROOT_PATH


You can find URL for this application on Cloud Functions management page in IBM Cloud portal.




