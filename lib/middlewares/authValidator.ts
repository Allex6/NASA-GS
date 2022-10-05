import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
    
export default function authValidator(req: Request, res: Response, next: NextFunction) {
    
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);
    
    const [scheme, token] = authorization.split(' ');
    if (!/^Bearer$/i.test(scheme)) return res.sendStatus(401);
    
    if (!token) return res.sendStatus(401);

    const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.loggedUser = payload.id;
    next();

}