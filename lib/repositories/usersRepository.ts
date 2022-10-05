import { userCreateData } from '../types/userCreateData';
import prisma from './../databases/prisma';

async function create(usersData: userCreateData){
    
    await prisma.users.create({ data: usersData });

}

async function getByEmail(email: string){

    const user = await prisma.users.findUnique({
        where: {
            email
        }
    });
    return user;

}

export default {
    create,
    getByEmail
}