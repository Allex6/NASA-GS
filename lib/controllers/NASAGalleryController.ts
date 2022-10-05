import NASAGalleryService from './../services/NASAGalleryService';
import { Request, Response, NextFunction } from 'express';

async function createNASAGallery(req :Request, res :Response, next :NextFunction){

    const bodyData = req.body;
    await NASAGalleryService.createNASAGallery(bodyData);
    res.sendStatus(201);

}

async function getById(req :Request, res :Response, next :NextFunction){

    const { id } = req.params;
    const NASAGalleryData = await NASAGalleryService.getById(Number(id));
    res.send(NASAGalleryData);

}

async function search(req :Request, res :Response, next :NextFunction){

    const { search } = req.query;
    const loggedUser = Number(res.locals.loggedUser);
    const NASAGallerys = await NASAGalleryService.search(search as string, loggedUser);
    res.send(NASAGallerys);

}

export default {
    createNASAGallery,
    getById,
    search
}