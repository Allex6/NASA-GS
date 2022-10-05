import usersImagesRepository from '../repositories/usersImagesRepository';
import { usersImagesCreateData } from '../types/usersImagesTypes';
import errorFactory from '../utils/errorFactory';

async function createUsersImages(usersImagesData: usersImagesCreateData){
    
    const createdImage = await usersImagesRepository.create(usersImagesData);
    return createdImage;

}

async function getById(id: number){

    await usersImagesRepository.getById(id);

}

async function list(){

    await usersImagesRepository.list();

}

async function updateUsersImages(id: number, usersImagesData: usersImagesCreateData){
    
	 const { userId, photoDate, url } = usersImagesData;
    await usersImagesRepository.update(id, { userId, photoDate, url });

}

async function deleteUsersImages(id: number){

    await usersImagesRepository.deleteUsersImages(id);

}

export default {
    createUsersImages,
    getById,
    list,
    updateUsersImages,
    deleteUsersImages
}