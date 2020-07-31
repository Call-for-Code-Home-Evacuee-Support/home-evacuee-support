const request = require('request-promise');

async function main(params) {
    //typeで場合分け. register_user or request_supply
    
    var res = {}
    
    if(params.type=="request_supply"){
        //request supplies
        //params: phone_number, supply_name, supply_num
        
        //get users list //TODO: heavy
        var usersData = await request({
            url: '<API_URL>/users',
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-IBM-Client-Id": "<API_ID>",
                "X-IBM-Client-Secret": "<API_Secret>"
            }
        });
        var users = JSON.parse(usersData).users
        //specify the user
        var user = users.find((user) => {
            return user.phone == params.phone_number
        })
        if(!user){return {"message": "user is not found"}}
        
        //get supplies list
        var suppliesData = await request({
            url: '<API_URL>/supplies',
            headers: {
                "Accept": "application/json",
                "X-IBM-Client-Id": "<API_ID>",
                "X-IBM-Client-Secret": "<API_Secret>"
            }
        });
        var supplies = JSON.parse(suppliesData).supplies
        //specify the supply
        var supply = supplies.find((supply) => {
            return supply.name == params.supply_name && supply.shelterId == user.shelterId
        })
        if(!supply){return {"message": "supply is not found"}}
        
        var req = {
            userId: user._id,
            supplyId: supply._id,
            num: params.supply_num
        }
        
        console.log(req)
        
        //send request to request supply
        res = await request({
            url: "<API_URL>/requests",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "X-IBM-Client-Id": "<API_ID>",
                "X-IBM-Client-Secret": "<API_Secret>"
            },
            json: req
        });
    }else if(params.type=="register_user"){
        //register user
        //params: name_first, phone_number, sheletr_name, family_num
        
        //get shelters list
        var sheltersData = await request({
            url: '<API_URL>/shelters',
            headers: {
                "Accept": "application/json",
                "X-IBM-Client-Id": "<API_ID>",
                "X-IBM-Client-Secret": "<API_Secret>"
            }
        });
        var shelters = JSON.parse(sheltersData).shelters
        
        //specify the shelter
        var shelter = shelters.find((shelter) => {
            return shelter.name == params.shelter_name
        })
        
        var user = {
            name: params.name_first,
            phone: String(params.phone_number),
            zipcode: shelter.zipcode, //shelter zipcode
            address: shelter.address, //shelter address
            latlng: shelter.latlng, //sheter latlng
            shelterId: shelter._id, //shelter id
            family: [],
        }
        
        //Todo: repeat for family_num
        for(let i=0;i<params.family_num;i++){
            user.family.push({age: null, gender: null, status: []})  //is it ok to use null ?
        }
        
        //send request to register user
        res = await request({
            url: "<API_URL>/users",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "X-IBM-Client-Id": "<API_ID>",
                "X-IBM-Client-Secret": "<API_Secret>"
            },
            json: user
        });
        
    }else{
        res = {"message": "request type is invalid"}
    }
	return res;
}
