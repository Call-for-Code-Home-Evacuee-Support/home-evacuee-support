API services
=============

This is a function to provide APIs. The APIs includes "Evacuee data processor" and "Supply distribution calculator".

The "Evacuee data processor" API receives a request to store/get evacuee data.

The "Supply distribution calculator" API creates a plan of distribution from the requests of supplies by home evacuees and the stock of supplies at evacuation centers nearby them.
It is possible to prioritize distribution plan for elderly people or pregnant women get specific supplies they need.
Furthermore, it assign the time when the evacuees come to evacuation center to receive supplies to avoid congestion.



## Getting started


In each steps, you can refer the 
[IBM's tutorial](https://cloud.ibm.com/docs/solution-tutorials?topic=solution-tutorials-serverless-api-webapp#sequence-of-actions-to-save-the-guestbook-entry)

### 1. create DB in Cloudant
You create following DB in Cloudant. 

* users
* supplies
* shelters
* requests
* distributions
* mainCategories
* timeslots

### 2. create actions of Functions

You create actions of Functions. You copy each files in [../actions](../actions) and paste to actions.

### 3. create APIs
You create public APIs from the actions.

The following is a list of required APIs and their constituent actions

If there are two or more actions in 1 APIs, You should create a sequence created by connecting the actions together.

the actions named create-document, list-document and read-document are predefined actions which access to Cloudant DB.
You can create them through GUI to bind each users.

#### GET /users
1. [init](../actions/init.js)
1. list-documents: bind for users DB
1. [format-users](../actions/format-users.js)

#### POST /users
1. [prepare-for-user](../actions/prepare-for-user.js)
1. create-document: bind for users DB

#### GET /users/id
1. read-document: bind for users DB

#### GET /supplies
1. [init](../actions/init.js)
1. list-documents: bind for supplies DB
1. [format-supplies](../actions/format-supplies.js)

#### POST /supplies
1. [prepare-for-supply](../actions/prepare-for-supply.js)
1. create-document: bind for supplies DB

#### PUT /supplies
1. [prepare-for-update-supply](../actions/prepare-for-update-supply.js)
1. update-document: bind for supplies DB

#### GET /requests
1. [init](../actions/init.js)
1. list-documents: bind for requests DB
1. [format-requests](../actions/format-requests.js)

#### POST /requests
1. [prepare-for-request](../actions/prepare-for-request.js)
1. create-document: bind for requests DB

#### PUT /requests
1. [prepare-for-update-request](../actions/prepare-for-update-request.js)
1. update-document: bind for requests DB

#### POST /distributions
1. [prepare-for-distribution](../actions/prepare-for-distribution.js)
1. create-document: bind for distributions DB

#### GET /distributions
1. [init](../actions/init.js)
1. list-documents: bind for distribution DB
1. [format-distributions](../actions/format-distributions.js)

#### PUT /distributions
1. [prepare-for-update-distribution](../actions/prepare-for-update-distribution.js)
1. update-document: bind for distribution DB

#### GET /distributions/userId
1. [get-distributions-by-user](../actions/get-distributions-by-user.js)

#### GET /shelters
1. [init](../actions/init.js)
1. list-documents: bind for shelters DB
1. [format-supplies](../actions/format-shelters.js)

#### POST /shelters
1. [prepare-for-shelter](../actions/prepare-for-shelter.js)
1. create-document: bind for shelters DB

#### GET /categories/main
1. [init](../actions/init.js)
1. list-documents: bind for mainCategories DB
1. [format-main-categories](../actions/format-main-categories.js)

#### POST /categories/main
1. [prepare-for-main-categories](../actions/prepare-for-main-categories.js)
1. create-document: bind for mainCategories DB

#### GET /timeslots
1. [init](../actions/init.js)
1. list-documents: bind for timeslots DB
1. [format-timeslots](../actions/format-timeslots.js)

#### POST /timeslots
1. [prepare-for-timeslots](../actions/prepare-for-timeslots.js)
1. create document: bind for timeslots DB

#### GET /timeslots/id
1. read-document: bind for timeslots DB

#### POST /calc
1. [read-dbs](../actions/read-dbs.js)
1. [calculator](../actions/calculator.js)
1. [write-distributions](../actions/write-distributions.js)

#### POST /schedule
1. [calc-scheduler](../actions/calc-scheduler.js)

#### POST /register
1. [register-user](../actions/register-user.js)


### 4. update API-URL,ID,Secret in functions and front-end apps

You modify the <API_URL>,<API_ID> and <API_Secret> in following actions

- [read-dbs](../actions/read-dbs.js)
- [write-distributions](../actions/write-distributions.js)
- [calc-scheduler](../actions/calc-scheduler.js)
- [get-distributions-by-user](../actions/get-distributions-by-user.js)
- [register-user](../actions/register-user.js)

For front-end applications, you refer to the [link]() and write the parameters to .env file

### 5. write predefined data into DB

You run following scripts in order, and write the predefined data into the DB

1. [createDummyShelters.py](../scripts/createDummyShelters.py)
1. [createDummySupplies.py](../scripts/createDummySupplies.py)
1. [createDummyMainCategories.py](../scripts/createMainCategories.py)

Now you're ready. Let's try!
