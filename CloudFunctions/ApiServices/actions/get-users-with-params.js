const request = require('request-promise');

async function main(params) {
    //currentPage, perPage, lightMode
    var skip = params.skip
    var limit = params.limit
    var lightMode = params.lightMode
    
    //users
    let usersData = await request({
        url: 'https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/users?skip='+skip+'&limit='+limit,
        headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": "bba1aae6-cdf2-4411-85a3-90a7cfac395b",
            "X-IBM-Client-Secret": "2ceb3408-6360-4596-b6ed-9b50d45a1c49"
        }
    });
    var users = JSON.parse(usersData).users
    
    if(lightMode){
        //console.log("light mode")
        users = users.map((user) => {
            return {
                _id: user._id,
                name: user.name,
                latlng: user.latlng
            }
        });
    }
    
    var res = {}
    res.users = users
    
	return res;
}
