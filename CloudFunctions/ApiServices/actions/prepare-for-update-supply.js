function main(params) {
    //todo some validation
    
    if(!(params._id && params._rev)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
            _id: params._id,
            _rev: params._rev,
            name: params.name,
            description: params.description,
            image: params.image,
            shelterId: params.shelterId,
            num: params.num,
            priority: params.priority,
            mainCategoryId: params.mainCategoryId,
            subCategoryId: params.subCategoryId,
            unit: params.unit
        }
    };
}