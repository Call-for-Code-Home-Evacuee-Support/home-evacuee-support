function main(params) {
    //todo some validation
    if(!(params.userId && params.supplyId && params.num)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
            date: new Date(),
            userId: params.userId,
            supplyId: params.supplyId,
            num: params.num,
            status: "waiting",
            acceptedNum: 0
        }
    };
}