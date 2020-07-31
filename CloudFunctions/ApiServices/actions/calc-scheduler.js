const request = require('request-promise');

async function main(params) {
    
    var startTime = Number(params.startTime)
    var endTime = Number(params.endTime)
    var dates = params.dates //休日除外する可能性も考慮
    var spanTime = Number(params.spanTime) //min?
    var shelterId = params.shelterId
    
    //create timeslots
    var timeslots = []
    for(let date of dates){
        for(let hour=startTime;hour<endTime;hour+=spanTime){
            let timeslot = {
                date: date,
                startTime: hour,
                endTime: hour + spanTime,
                shelterId: shelterId  
            }
            
            let response = await request({
                url: "<API_URL>/timeslots",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "X-IBM-Client-Id": "<API_ID>",
                    "X-IBM-Client-Secret": "<API_Secret>",
                    "X-Debug-Mode": true
                },
                json: timeslot
            });
            timeslot._id = response.id
            
            timeslots.push(timeslot)
        }
    }
    
    if(timeslots.length===0) {return {"message": "no timeslots are created"}}
    
    //get distributions
    let distributionsData = await request({
        url: '<API_URL>/distributions',
        headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": "<API_ID>",
            "X-IBM-Client-Secret": "<API_Secret>"
        }
    });
    
    let distributions = JSON.parse(distributionsData).distributions
    
    var pickedDistributions = distributions.filter((d) => {
        return d.shelterId == shelterId && !d.timeslotId
    })
    
    //list users
    var userIds = []
    for(let distribution of pickedDistributions) {
        let userId = distribution.userId
        if(userIds.indexOf(userId)==-1){
            userIds.push(userId)
        }
    }
    
    //assign users to timeslots
    for(let i in userIds) {
        var slotOrder = i%timeslots.length
        console.log(slotOrder)
        
        var userDistributions = pickedDistributions.filter((d) => {
            return d.userId == userIds[i]
        })
        
        for(let distribution of userDistributions) {
            distribution.timeslotId = timeslots[slotOrder]._id
            console.log(timeslots[slotOrder]._id)
            await request({
                url: '<API_URL>/distributions',
                method: "PUT",
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

    var res = {"message": "calculation succeed!"}
    
	return res;
}
