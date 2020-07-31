const request = require('request-promise');

async function main(params) {
    
    if(params.distributions.length>0){
        for(let distribution of params.distributions){
            await request({
                url: "<API_URL>/distributions",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "X-IBM-Client-Id": "<API_ID>",
                    "X-IBM-Client-Secret": "<API_Secret>"
                },
                json: distribution
            });
        }
    }
    
    //update request status to request db
    if(params.requests.length>0){
        for(let item of params.requests){
            await request({
                url: "<API_URL>/requests",
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "X-IBM-Client-Id": "<API_ID>",
                    "X-IBM-Client-Secret": "<API_Secret>"
                },
                json: item
            });
        }
    }
    
    //update supply num to supplies db
    if(params.supplies.length>0){
        for(let supply of params.supplies){
            await request({
                url: "<API_URL>/supplies",
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "X-IBM-Client-Id": "<API_ID>",
                    "X-IBM-Client-Secret": "<API_Secret>"
                },
                json: supply
            });
        }
    }
    
    //return res
    
    return params
}
