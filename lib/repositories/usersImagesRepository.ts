import prisma from './../databases/prisma';

async function create(usersImagesData: { userId: any, photoDate: any, url: any }){
    
	 const { userId, photoDate, url } = usersImagesData;
    await prisma.usersImages.create({ data: { userId, photoDate, url } });

}

async function getById(id: number){

    const usersImages = await prisma.usersImages.findUnique({
        where: {
            id
        }
    });
    return usersImages;

}

async function list(){

    const usersImagess = await prisma.usersImages.findMany();
    return usersImagess;

}

async function update(id: number, usersImagesData: { userId: any, photoDate: any, url: any }){
    
	 const { userId, photoDate, url } = usersImagesData;
    await prisma.usersImages.update({
        where: {
            id
        },
        data: {
            userId, photoDate, url
        }
    });

}

async function deleteUsersImages(id: number){

    await prisma.usersImages.delete({
        where: {
            id
        },
    });

}

async function getGallery(userId: number) {
 
    const gallery = await prisma.usersImages.findMany({
        where: {
            userId
        }
    });
    return gallery;
 
}

export default {
    create,
    getById,
    list,
    update,
    deleteUsersImages,
    getGallery
}