import APODImagesRepository from '../repositories/APODImagesRepository';
import usersImagesRepository from '../repositories/usersImagesRepository';
import errorFactory from '../utils/errorFactory';
import axios from 'axios';
import dotenv from 'dotenv';
import dayjs from 'dayjs';

dotenv.config();

const NASA_API_KEY = process.env.NASA_API_KEY as string;

async function updateImage(imageData: { date: string, url: string }, loggedUser: number){

    const { date, url } = imageData;
    const APODImageData = await APODImagesRepository.getByDate(new Date(date));

    if (APODImageData) {

        await APODImagesRepository.incrementViews(APODImageData.id, 1);
        return APODImageData;

    } else {

        const newAPODImageData = await APODImagesRepository.create({ photoDate: new Date(date), url, views: 1 });
        await usersImagesRepository.create({ userId: loggedUser, photoDate: new Date(date), url });
        return newAPODImageData;

    }

}

async function todayAPODImage(loggedUser: number){

    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    const APODImageData = await updateImage(response.data, loggedUser);
    return APODImageData;

}

async function rangeAPODImages(start_date: string, end_date: string, loggedUser: number) {

    const startDate = dayjs(start_date);
    const endDate = dayjs(end_date);

    if(!startDate.isValid()) throw errorFactory('unprocessible_entity', 'Invalid start date');
    if(!endDate.isValid()) throw errorFactory('unprocessible_entity', 'Invalid end date');
    if (startDate.isAfter(endDate)) throw errorFactory('unprocessable_entity', 'Start date must be before end date.');
    if(startDate.isAfter(dayjs())) throw errorFactory('unprocessable_entity', 'Start date must be before today.');
    if(endDate.isAfter(dayjs())) throw errorFactory('unprocessable_entity', 'End date must be before today.');
    
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&start_date=${start_date}&end_date=${end_date}`);
    const imagesList = response.data;
    const processedImages = [];

    for (let i = 0; i < imagesList.length; i++) {

        const { date, url } = imagesList[i];
        const APODImageData = await updateImage({ date, url }, loggedUser);
        processedImages.push(APODImageData);

    }

    return processedImages;

}

async function getByDate(date: string, loggedUser: number) {

    try {
     
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`);
    
        const APODImageData = await updateImage(response.data, loggedUser);
        return APODImageData;

    } catch (err) {
        throw errorFactory('not_found', 'Image not found');
    }

}

export default {
    todayAPODImage,
    rangeAPODImages,
    getByDate
}