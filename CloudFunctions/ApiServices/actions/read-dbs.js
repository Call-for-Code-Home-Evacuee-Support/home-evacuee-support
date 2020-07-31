const request = require('request-promise');

async function main(params) {
    var shelterId = params.shelterId //shelterIdを指定する
    
    var res={}
    
    //shelters
    let sheltersData = await request({
        url: "<API_URL>/shelters",
        headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": "<API_ID>",
            "X-IBM-Client-Secret": "<API_Secret>"
        }
    });
    let shelters = JSON.parse(sheltersData)
    res.shelter = shelters.shelters.find((_shelter) => {
        return _shelter._id == shelterId
    })
    
    //users
    let usersData = await request({
        url: "<API_URL>/users",
        headers: {
            //Todo: how to use X-IBM-CLIENT-ID or SECRET by environment variable?
            "Accept": "application/json",
            "X-IBM-Client-Id": "<API_ID>",
            "X-IBM-Client-Secret": "<API_Secret>"
        }
    });
    
    let users = JSON.parse(usersData)
    res.users = users.users.filter((_user) => {
        if(_user.shelterId){
            return _user.shelterId == shelterId
        }else{
            return false
        }
    })
    
    //supplies
    let suppliesData = await request({
        url: "<API_URL>/supplies",
        headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": "<API_ID>",
            "X-IBM-Client-Secret": "<API_Secret>"
        }
    });
    let supplies = JSON.parse(suppliesData)
    res.supplies = supplies.supplies.filter((_supply) => {
        return _supply.shelterId == shelterId
    })
    
    //requests
    let requestsData = await request({
        url: "<API_URL>/requests",
        headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": "<API_ID>",
            "X-IBM-Client-Secret": "<API_Secret>"
        }
    });
    let requests = JSON.parse(requestsData)
    res.requests = requests.requests.filter((req) => {
        let u = res.users.find((_user) => {
            return _user._id == req.userId
        }) 
        return req.status == "waiting" && u
    })
    
    return res
}