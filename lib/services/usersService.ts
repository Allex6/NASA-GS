import usersRepository from '../repositories/usersRepository';
import usersImagesRepository from '../repositories/usersImagesRepository';
import errorFactory from '../utils/errorFactory';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { userCreateData } from '../types/userCreateData';
dotenv.config();

async function createUsers(usersData: userCreateData){
    
    const user = await usersRepository.getByEmail(usersData.email);
    if(user) throw errorFactory('conflict', 'Email already registered.');

    usersData.password = await bcrypt.hash(usersData.password, 12);
    await usersRepository.create(usersData);

}

async function login(email: string, password: string){

    const user = await usersRepository.getByEmail(email);
    if(!user) throw errorFactory('unauthorized', 'Invalid credentials.');

    const correctPassword = await bcrypt.compare(password, user.password);
    if(!correctPassword) throw errorFactory('unauthorized', 'Invalid credentials.');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    return token;

}

async function getGallery(loggedUserId: number) {

    const gallery = await usersImagesRepository.getGallery(loggedUserId);
    return gallery;

}

export default {
    createUsers,
    login,
    getGallery
}