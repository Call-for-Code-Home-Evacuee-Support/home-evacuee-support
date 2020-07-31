const request = require('request-promise');

async function main(params) {
    
    if(!(params.userId)){
        return Promise.reject({message: 'lack of params'});
    }
    
    var userId = params.userId
    
    let distributionsData = await request({
        url: '<API_URL>/distributions',
        headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": "<API_ID>",
            "X-IBM-Client-Secret": "<API_Secret>"
        }
    });
    var distributions = JSON.parse(distributionsData).distributions
    
    var pickedDistributions = distributions.filter((d) => {
        return d.userId == userId
    })
    
    var res = {}
    res.distributions = pickedDistributions
	
	return res
}