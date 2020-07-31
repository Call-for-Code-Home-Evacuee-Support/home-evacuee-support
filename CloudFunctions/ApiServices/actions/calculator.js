function main(params) {
    const shelter = params.shelter
    const users = params.users
    const supplies = params.supplies
    const requests = params.requests
    
    var distributions = []
    
    function addDistributions(userId, supplyId){
        var distribution = {}
        //user,supplyに同一のものがあれば、そこに追加。なければ新規作成
        
        distribution = distributions.find((_dist) => {
            return _dist.userId == userId && _dist.supplyId ==supplyId
        })
        if(distribution) {
            distribution.num++;
        }else{
            distribution = {
                userId: userId,
                supplyId: supplyId,
                num: 1,
                shelterId: shelter._id
            }
            distributions.push(distribution)
        }
        return distribution
    }
    
    function getPriority(user, familyId, supply, request) {
      if(!supply.priority){return 0;}

      var priority = 0
      
      var t0 = new Date(request.date)
      var t1 = new Date()
      var days = Math.floor((t1-t0)/86400000)
      
      priority += days
      
      var genderPriority = supply.priority[user.family[familyId].gender]
      if(genderPriority){
        priority += genderPriority
      }

      if(user.family[familyId].age<=5){
        if(supply.priority.infant){
          priority += supply.priority.infant
        }
      }else if(user.family[familyId].age>=60){
        if(supply.priority.old){
          priority += supply.priority.old
        }
      }

      var statusList = user.family[familyId].status
      if(statusList.length>0){
        for(let i in statusList){
            if(supply.priority[statusList[i]]){
                priority += supply.priority[statusList[i]]
            }
        }
      }

      return priority
    }
    
    //sort and distribute
    for(let supply of supplies) { //stock>0
        var pickedRequests = requests.filter((request) => {
            return request.supplyId == supply._id
        })
        var priorities = []    
        var pMax = 0
        
        for(let request of pickedRequests){
            var userId = request.userId
            
            //重複がある場合の処理→とりあえず無視する。request時に処理するのがベスト。
           
            //new issue
            var user = users.find((_user) => {
                return _user._id == userId
            })
            for(let index in user.family){
                let p = getPriority(user, index, supply, request)
                
                if(p>pMax){pMax=p;}
                var priority = {
                    userId: userId,
                    familyId: index, 
                    requestId: request._id,
                    value: p
                }
                priorities.push(priority)
            }
        }
        
        //優先度高い順に処理
        for(let p=pMax;p>=0;p--){ //only integer
            //priority is p
            if(supply.num<=0){break;}
            
            pickedPriorities = priorities.filter((_priority) => {
                return _priority.value == p
            })
            if(pickedPriorities.length>0){
                for(priority of pickedPriorities){
                    var req = pickedRequests.find((_req) => {
                        return _req._id == priority.requestId
                    })
                    if(supply.num>0){
                        if(req.status == "waiting"){
                            supply.num -= 1
                            req.acceptedNum += 1
                            supply.modified = true
                            req.modified = true 
                            var distribution = addDistributions(priority.userId, supply._id)
                            if(req.acceptedNum >= req.num){
                                req.status = "approved"
                            }
                        }
                    }else{
                        console.log("supply stocks are 0")
                        break;
                    }
                }
            }
        }
    }
    
    //編集したものだけ書き込む
    var res = {}
    res.distributions = distributions
    res.supplies = supplies.filter((supply) => {
        return supply.modified
    })
    res.requests = requests.filter((req) => {
        return req.modified
    })
    
	return res
}
