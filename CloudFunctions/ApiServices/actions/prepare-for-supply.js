function main(params) {
	//todo some validation
    if(!(params.name && params.shelterId && params.num)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
            name: params.name,
            mainCategory: params.mainCategory,
            subCategory: params.subCategory,
            unit: params.unit,
            description: params.description,
            image: params.image,
            num: params.num,
            priority: params.priority,
            shelterId: params.shelterId,
            mainCategoryId: params.mainCategoryId,
            subCategoryId: params.subCategoryId,
            unit: params.unit
        }
    };
}
