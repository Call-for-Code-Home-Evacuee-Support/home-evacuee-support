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

with open('../dummy-data/PoC-dummy-shelters.csv', 'r', encoding='shift_jis') as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(csv_reader)
    for row in csv_reader:
        # 各行に対して
        print(row)
        shelter = {
            "name": row[1],
            "zipcode": row[0],
            "address": row[2],
            "email": "",
            "phone": row[3],
            "latlng": [float(row[4]), float(row[5])] 
        }
        res = requests.post(url + "/shelters", json.dumps(shelter), headers=headers, proxies=proxies)
        print(res.status_code)
        print(res.json())

