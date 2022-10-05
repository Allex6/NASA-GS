import prisma from './../databases/prisma';

async function create(APODImagesData: { photoDate: any, url: any, views: any }){
    
	const { photoDate, url, views } = APODImagesData;
    const createdImage = await prisma.aPODImages.create({ data: { photoDate, url, views } });
    return createdImage;

}

async function getByDate(date: Date){

    const APODImages = await prisma.aPODImages.findFirst({
        where: {
            photoDate: date
        }
    });
    return APODImages;

}

async function incrementViews(id: number, views: number){

    await prisma.aPODImages.update({
        where: {
            id
        },
        data: {
            views: {
                increment: views
            }
        }
    });

}

export default {
    create,
    getByDate,
    incrementViews
}