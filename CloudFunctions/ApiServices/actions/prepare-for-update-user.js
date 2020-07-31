function main(params) {
    
    if(!(params._id && params._rev)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
            _id: params._id,
            _rev: params._rev,
            name: params.name,
            address: params.address,
            zipcode: params.zipcode,
            latlng: params.latlng,
            email: params.email,
            phone: params.phone,
            remarks: params.remarks,
            family: params.family,
            shelterId: params.shelterId
        }
    };
}