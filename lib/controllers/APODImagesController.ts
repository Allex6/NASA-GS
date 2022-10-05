import APODImagesService from './../services/APODImagesService';
import { Request, Response, NextFunction } from 'express';

async function todayAPODImage(req :Request, res :Response, next :NextFunction) {

    const { start_date, end_date } = req.query;
    if(start_date && end_date) return next();

    const loggedUser = Number(res.locals.loggedUser);
    const APODImagesData = await APODImagesService.todayAPODImage(loggedUser);
    res.send(APODImagesData);

}

async function rangeAPODImages(req :Request, res :Response, next :NextFunction) {
    
    const { start_date, end_date } = req.query;
    const loggedUser = Number(res.locals.loggedUser);
    const APODImagesData = await APODImagesService.rangeAPODImages(start_date as string, end_date as string, loggedUser);
    res.send(APODImagesData);

}

async function getByDate(req :Request, res :Response, next :NextFunction) {
    
    const { date } = req.params;
    const loggedUser = Number(res.locals.loggedUser);
    const APODImagesData = await APODImagesService.getByDate(date, loggedUser);
    res.send(APODImagesData);

}

export default {
    todayAPODImage,
    rangeAPODImages,
    getByDate
}