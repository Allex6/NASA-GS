import { Request, Response, NextFunction } from 'express';

function errorHandler(error: { type: string, message: string | number }, req: Request, res: Response, next: NextFunction){

    console.log('Error handler called', error);

    if(error.type === 'bad_request') res.status(400).send(error.message);
    if(error.type === 'not_found') res.status(404).send(error.message);
    if(error.type === 'conflict') res.status(409).send(error.message);
    if(error.type === 'unprocessable_entity') res.status(422).send(error.message);

    return res.sendStatus(500);

};

export default errorHandler;