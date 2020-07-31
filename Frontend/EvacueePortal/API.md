2020/6/2 updated

# MVP APIs

- GET /api/users
- POST /api/users
- GET /api/supplies
- GET /api/distributions
- GET /api/shelters

## GET /api/users
to get users list by local gov portal

```
res.data: [
  {
    _id: "00000001",
    name: "Yusuke Arai",
    latlng: [35.0, 139.0],
    zipcode: "185-0001",
    address: "1-2-3, kitamachi, kokubunji, tokyo",
    email: "yusuke.arai.fc@hitachi.com",
    phone: "080-1111-2222",
    remarks: "other comments",
    family: [
      {
        gender: "male",
        age: 27,
        status: "ok"
      },
      {
        gender: "female",
        age: 30,
        status: "pregnant"
      },
      {
        gender: "male",
        age: 2,
        status: "need help"
      },
      ...
    ]
  },
  ...
]
```

## POST /api/users
to send victim's information and supply requests by victim portal

```
body: {
  name: "Yusuke Arai",
  latlng: [35.0, 139.0],
  address: "1-1-1, kokubunji, tokyo",
  zipcode: "187-0001",
  email: "yusuke.arai.fc@hitachi.com",
  phone: "080-1111-2222",
  remarks: "other comments",
  family: [
    {
      gender: "male",
      age: 27,
      status: "ok"
    },
    {
      gender: "female",
      age: 30,
      status: "pregnant"
    },
    {
      gender: "male",
      age: 2,
      status: "need help"
    },
    ...
  ],
  requests: [
    {
      _id: "s001",
      num: 2
    },
    {
      _id: "s002",
      num: 1
    },
    ...
  ]
}
```

## GET /api/supplies
to get supplies list by both victim portal and local gov portal 

```
res.data: [
  {
    _id: "s001"
    name: "Food",
    description: "Onigiri 7 days pack",
    image: "http://image.sample.com/100",
    num: 100,
    type: "A",
    shelterId: "e01"
  },
  {
    _id: "s002"
    name: "Water",
    description: "2L*6 pack",
    image: "http://image.sample.com/200",
    num: 200,
    type: "B",
    shelterId: "e02"
  },
  ...
]
```

## GET /api/distributions
to get distribution list by local gov portal 

```
res.data: [
  {
    _id: "d00001",
    date: "2020-05-20 10:30AM",
    userId: "00000001",
    supplyId: "s001",
    shelterId: "e01",
    num: 2,
    status: "done"
  },
  {
    _id: "d00002",
    date: "2020-05-21 14:30PM",
    userId: "00000002",
    supplyId: "s002",
    shelterId: "e02",
    num: 1,
    status: "todo"
  },
  ...
]
```

## GET /api/shelters
to get evacuation-center list by local gov portal 

```
res.data: [
  {
    _id: "e01",
    name: "kokubunji 1st elementary school",
    latlng: [135.0, 35.2],
    zipcode: "185-0001",
    address: "1-1-1, kitamachi, kokubunji, tokyo",
    email: null,
    phone: "03-xxxx-xxxx"
  },
  {
    _id: "e02",
    name: "kokubunji 2nd elementary school",
    latlng: [135.1, 35.1],
    zipcode: "185-0002",
    address: "1-1-1, nishimachi, kokubunji, tokyo",
    email: null,
    phone: "03-xxxx-xxxx"
  },
  ...
]
```

## Other useful APIs in future

|high<br>priority|method|url|description|
|---|---|---|---|
|!| POST    |/api/supplies       |to add a supply data by local gov portal      |
| | PUT     |/api/supplies/:id   |to modify a supply data by local gov portal   |
| | DELETE  |/api/supplies/:id   |to delete a supply data by local gov portal   |
| | PUT     |/api/users/:id      |to modify a user data by victim portal        |
| | DELETE  |/api/users/:id      |to delete a user account by victim portal     |
|!| GET     |/api/requests       |to get victim's requests by local gov portal  |
|!| POST    |/api/requests       |to add a supply request by victim portal (after initial register) |
| | PUT     |/api/requests/:id   |to modify a supply request by victim portal   |
| | DELETE  |/api/requests/:id   |to delete a supply request by victim portal   |
|!| GET     |/api/requests?id=userId   |to get victim's self requests by victim portal  |
|!| GET     |/api/distributions?id=userId |to get victim's self supply distribution list by victim portal  | 

