import NASAGalleryRepository from '../repositories/NASAGalleryRepository';
import errorFactory from '../utils/errorFactory';
import dotenv from 'dotenv';
import axios from 'axios';
import usersImagesRepository from '../repositories/usersImagesRepository';

dotenv.config();

const NASA_API_KEY = process.env.NASA_API_KEY as string;

async function createNASAGallery(NASAGalleryData: { photoDate: any, url: any, views: any, mediaType: any }){
    
	 const { photoDate, url, views, mediaType} = NASAGalleryData;
    await NASAGalleryRepository.create({ photoDate, url, views, mediaType });

}

async function getById(id: number){

    const imageData = await NASAGalleryRepository.getById(id);
    if(!imageData) throw errorFactory('not_found', 'Image not found');
    return imageData;

}

async function updateImage(imageData: { date: string, url: string }, loggedUser: number){

    const { date, url } = imageData;
    const NASAGalleryImage = await NASAGalleryRepository.getByDate(new Date(date));

    if (NASAGalleryImage) {

        await NASAGalleryRepository.incrementViews(NASAGalleryImage.id, 1);
        return NASAGalleryImage;

    } else {

        const newNASAGalleryImage = await NASAGalleryRepository.create({ photoDate: new Date(date), url, views: 1, mediaType: 'image' });
        await usersImagesRepository.create({ userId: loggedUser, photoDate: new Date(date), url });
        return newNASAGalleryImage;

    }

}

async function search(text: string, loggedUser: number){

    if(!text) throw errorFactory('bad_request', 'No search text provided');

    const response = await axios.get(`https://images-api.nasa.gov/search?q=${text}&media_type=image`);
    const images = response.data.collection.items;

    const processedImages = [];

    for (const image of images) {

        const { data, links } = image;
        const { date_created } = data[0];
        const { href: url } = links[0];

        const imageData = await updateImage({ date: date_created, url }, loggedUser);
        processedImages.push(imageData);

    }

    return processedImages;

}

export default {
    createNASAGallery,
    getById,
    search
}