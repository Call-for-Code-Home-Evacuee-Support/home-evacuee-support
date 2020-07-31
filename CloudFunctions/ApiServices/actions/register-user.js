var request = require( 'request-promise' );

async function main( params ) {
    
    var requests = params.requests //get requests from user post
    
    var user = {
        name: params.name,
        address: params.address,
        zipcode: params.zipcode,
        latlng: params.latlng,
        email: params.email,
        phone: params.phone,
        family: params.family,
        shelterId: params.shelterId,
        remarks: params.remarks
    }
    
    //register user
    var res = await request({
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
    
    var userId = await res.id //return value is {id: xxxx, rev: xxxx, ...} so that we get only userId
    if(!userId){
        console.log("userId is undefined")
        return res
    }
    
    //register requests
    if(requests.length>0){
        console.log(requests.length)
        
        for(let r of requests) { //you can't use "request" for same as request function
            var req = {
                userId: userId,
                supplyId: r._id,
                num: r.num
            }
            
            //call request API
            console.log(JSON.stringify(req))
            await request({
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
        }
    }
    
    return res //not include requests response
}
