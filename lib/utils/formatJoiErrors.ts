import { ValidationError } from 'joi';
    export default function(error: ValidationError){

    const result = error.details.map((item: { message: string }) => item.message);
    return result;
    
};