function main(params) {
    //todo some validation
    if(!(params.userId && params.supplyId && params.num && params.shelterId)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
           date: new Date(),
           userId: params.userId,
           supplyId: params.supplyId,
           shelterId: params.shelterId,
           num: params.num,
           status: "todo"
        }
    };
}