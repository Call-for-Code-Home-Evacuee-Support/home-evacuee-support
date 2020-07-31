function main(params) {
    //todo some validation
    
    if(!(params._id && params._rev)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
            _id: params._id,
            _rev: params._rev,
            date: params.date,
            userId: params.userId,
            supplyId: params.supplyId,
            num: params.num,
            status: params.status
        }
    };
}