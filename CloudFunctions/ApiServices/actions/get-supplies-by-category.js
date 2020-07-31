const request = require('request-promise');

async function main(params) {
    
    if(!(params.mainCategoryId)){
        return Promise.reject({message: 'lack of params'});
    }
    
    var mainCategoryId = params.mainCategoryId
    //var subCategoryId = params.subCategoryId
    
    let suppliesData = await request({
        url: 'https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/supplies',
        headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": "bba1aae6-cdf2-4411-85a3-90a7cfac395b",
            "X-IBM-Client-Secret": "2ceb3408-6360-4596-b6ed-9b50d45a1c49"
        }
    });
    var supplies = JSON.parse(suppliesData).supplies
    
    var pickedSupplies = supplies.filter((supply) => {
        return supply.mainCategoryId == mainCategoryId
    })
    
    
    var res = {}
    res.supplies = pickedSupplies
	return res
}
