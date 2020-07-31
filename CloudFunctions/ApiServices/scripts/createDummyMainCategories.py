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


mainCategories = []
with open('../dummy-data/PoC-dummy-supplies.csv', 'r', encoding='shift_jis') as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(csv_reader)
    for row in csv_reader:
        mainCategory = {
            "name": row[1]
        }

        existMainCategory = [c for c in mainCategories if c["name"] == row[1]]
        if existMainCategory == []:
            mainCategories.append(mainCategory)


for mainCategory in mainCategories:
    print(mainCategory)
    res = requests.post(url + "/categories/main", json.dumps(mainCategory), headers=headers, proxies=proxies)
    print(res.json())
