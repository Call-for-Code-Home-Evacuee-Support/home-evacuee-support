function main(params) {
    //todo some validation
    if(!(params.name && params.mainCategoryId)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
           name: params.name,
           mainCategoryId: params.mainCategoryId,
           image: null,
           description: ""
        }
    };
}