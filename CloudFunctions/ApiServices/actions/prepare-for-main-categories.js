function main(params) {
    //todo some validation
    if(!(params.name)){
        return Promise.reject({message: 'lack of params'});
    }
    
     return {
        doc: {
           name: params.name,
           description: "",
           image: null
        }
    };
}