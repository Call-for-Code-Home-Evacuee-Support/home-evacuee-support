#!/usr/bin/env
# -*- coding: utf-8 -*-

import csv
import requests
import random
import json
import os
from os.path import join, dirname
from dotenv import load_dotenv

# 環境変数読み込み
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

# print(shelter)

# get main categories
res = requests.get(url + "/categories/main", headers=headers, proxies=proxies)
mainCategories = res.json()["mainCategories"]
# print(mainCategories)

# get sub categories
# res = requests.get(url + "/categories/sub", headers=headers, proxies=proxies)
# subCategories = res.json()["subCategories"]
# print(subCategories)


count = 0
with open('../dummy-data/PoC-dummy-supplies.csv', 'r', encoding='shift_jis') as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(csv_reader)
    for row in csv_reader:
        print("------------------------")
        print("count: ", count)
        # 各行に対して
        print(row)

        mainCategory = [m for m in mainCategories if m["name"] == row[1]][0]
        # subCategory = [s for s in subCategories if s["name"] == row[2] and s["mainCategoryId"]==mainCategory["_id"]][0]
        
        supply = {
            "mainCategoryId": mainCategory["_id"],
            "subCategoryId": "", # subCategory["_id"],
            "name": row[3],
            "unit": row[4],
            "description": "",
            "shelterId": shelter["_id"],
            "image": None,
            "num": 100,
            "priority": {
                "infant": 10,
                "pregnant": 3,
                "female": 1
            } 
        }
        
        res = requests.post(url + "/supplies", json.dumps(supply), headers=headers, proxies=proxies)
        print("response: ", res.json())

        count += 1

