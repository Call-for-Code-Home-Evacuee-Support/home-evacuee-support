function main(params) {
    //todo some validation
    if(!(params.date && params.startTime && params.endTime && params.shelterId)){
        return Promise.reject({message: 'lack of params'});
    }

    return {
        doc: {
           date: params.date,
           startTime: params.startTime,
           endTime: params.endTime,
           shelterId: params.shelterId
        }
    };
}
