#!/usr/bin/env
# -*- coding: utf-8 -*-

import csv
import requests
import random
import json
import os
import sys
from os.path import join, dirname
from dotenv import load_dotenv

args = sys.argv

# load environment variables
load_dotenv(join(dirname(__file__), '.env'))

url = os.environ.get("VUE_APP_IBM_CLIENT_URL2")

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-IBM-Client-Id": os.environ.get("VUE_APP_IBM_CLIENT_ID2"),
    "X-IBM-Client-Secret": os.environ.get("VUE_APP_IBM_CLIENT_SECRET2"),
}
proxies = {
    "http": os.environ.get("HTTP_PROXY"),
    "https": os.environ.get("HTTPS_PROXY")
}

# get shelter info
res = requests.get(url + "/shelters", headers=headers, proxies=proxies)
shelters = res.json()["shelters"]

shelterName = "第一小学校"
shelter = [s for s in shelters if s["name"] == shelterName][0]

print(shelter)

# get supply info
res = requests.get(url + "/supplies", headers=headers, proxies=proxies)
supplies = res.json()["supplies"]

# supplyName = ""
# supply = [s for s in supplies if s["name"] == supplyName][0]

# get users info
res = requests.get(url + "/users", headers=headers, proxies=proxies)
users = res.json()["users"]

pickedUsers = []
for user in users:
    if "shelterId" in user:
        if user["shelterId"] == shelter["_id"]:
            pickedUsers.append(user)

print(len(pickedUsers))

# create dummy request
num = int(args[1])
for i in range(num):
    print(i+1)
    req = {
        "userId": pickedUsers[i]["_id"],
        "supplyId": random.choice(supplies)["_id"],
        "num": len(pickedUsers[i]["family"])
    }
    res = requests.post(url + "/requests", json.dumps(req), headers=headers, proxies=proxies)
    print(res.json())