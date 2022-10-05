function errorFactory(type: string | number, message: string){

    return {
        type,
        message
    }

};
    
export default errorFactory;