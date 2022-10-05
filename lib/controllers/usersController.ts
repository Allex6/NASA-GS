import usersService from './../services/usersService';
import { Request, Response, NextFunction } from 'express';

async function createUsers(req :Request, res :Response, next :NextFunction){

    const bodyData = req.body;
    await usersService.createUsers(bodyData);
    res.sendStatus(201);

}

async function login(req :Request, res :Response, next :NextFunction){

    const { email, password } = req.body;
    const token = await usersService.login(email, password);
    res.send({ token });

}

async function getGallery(req :Request, res :Response, next :NextFunction) {
    
    const loggedUser = Number(res.locals.loggedUser);
    const gallery = await usersService.getGallery(loggedUser);
    res.send(gallery);

}

export default {
    createUsers,
    login,
    getGallery
}