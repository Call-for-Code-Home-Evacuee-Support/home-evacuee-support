const request = require('request-promise');

async function main(params) {
    //typeで場合分け. register_user or request_supply
    
    var res = {}
    
    if(params.type=="request_supply"){
        //request supplies
        //params: phone_number, supply_name, supply_num
        
        //get users list //TODO: heavy
        var usersData = await request({
            url: 'https://ec80e471.jp-tok.apigw.appdomain.cloud/test/users',
            method: "GET",
            headers: {
                "Accept": "application/json"
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
            url: 'https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/supplies',
            headers: {
                "Accept": "application/json",
                "X-IBM-Client-Id": "bba1aae6-cdf2-4411-85a3-90a7cfac395b",
                "X-IBM-Client-Secret": "2ceb3408-6360-4596-b6ed-9b50d45a1c49"
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
            url: "https://ec80e471.jp-tok.apigw.appdomain.cloud/test/requests",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            },
            json: req
        });
    }else if(params.type=="register_user"){
        //register user
        //params: name_first, phone_number, sheletr_name, family_num
        
        //get shelters list
        var sheltersData = await request({
            url: 'https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/shelters',
            headers: {
                "Accept": "application/json",
                "X-IBM-Client-Id": "bba1aae6-cdf2-4411-85a3-90a7cfac395b",
                "X-IBM-Client-Secret": "2ceb3408-6360-4596-b6ed-9b50d45a1c49"
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
        var familyNum = Number(params.family_num)
        if(familyNum == 1){
            user.family = [
            {
            gender: params.gender,
            age: params.age,
            status: []
            }
            ]
        }
        else if(familyNum == 2){
            user.family = [
            {
            gender: params.gender,
            age: params.age,
            status: []
            },
            {
            gender: [],
            age: [],
            status: []
            }
            ]
        }
        else if(familyNum == 3){
            user.family = [
            {
            gender: params.gender,
            age: params.age,
            status: []
            },
            {
            gender: [],
            age: [],
            status: []
            },
            {
            gender: params.child1gender,
            age: params.child1age,
            status: []
            }
            ]
        }
        else if(familyNum == 4){
            user.family = [
            {
            gender: params.gender,
            age: params.age,
            status: []
            },
            {
            gender: [],
            age: [],
            status: []
            },
            {
            gender: params.child1gender,
            age: params.child1age,
            status: []
            },
            {
            gender: params.child2gender,
            age: params.child2age,
            status: []
            }
            ]
        }
        else if(familyNum == 5){
            user.family = [
            {
            gender: params.gender,
            age: params.age,
            status: []
            },
            {
            gender: [],
            age: [],
            status: []
            },
            {
            gender: params.child1gender,
            age: params.child1age,
            status: []
            },
            {
            gender: params.child2gender,
            age: params.child2age,
            status: []
            },
            {
            gender: params.child3gender,
            age: params.child3age,
            status: []
            }
            ]
        }
        if(params.pregnancy=="Yes"){
            if(params.gender=="female"){
                user.family[0].status.push("pregnant")
            }
            else{
                user.family[1].status.push("pregnant")
                user.family[1].gender.push("female")
            }
        }

        
        //send request to register user
        res = await request({
            url: "https://ec80e471.jp-tok.apigw.appdomain.cloud/test/users",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            },
            json: user
        });
        
    }else{
        res = {"message": "request type is invalid"}
    }
	return res;
}
