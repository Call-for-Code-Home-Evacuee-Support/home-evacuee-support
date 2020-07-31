function main(params) {
    //todo some validation
    if(!(params.name && params.shelterId && params.family && params.phone)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
            name: params.name,
            address: params.address,
            zipcode: params.zipcode,
            latlng: params.latlng,
            email: params.email,
            phone: params.phone,
            remarks: params.remarks,
            family: params.family,
            shelterId: params.shelterId,
            way: params.way
        }
    };
}