import prisma from './../databases/prisma';

/**
 * @description Insert a new NASAGallery record into the database.
 * @param {Object} NASAGalleryData An object with the fields needed to create a NASAGallery
 */
async function create(NASAGalleryData: { photoDate: any, url: any, views: any, mediaType: any }){
    
	 const { photoDate, url, views, mediaType } = NASAGalleryData;
    await prisma.nASAGallery.create({ data: { photoDate, url, views, mediaType } });

}

async function getById(id: number){

    const NASAGallery = await prisma.nASAGallery.findUnique({
        where: {
            id
        }
    });
    return NASAGallery;

}

async function getByDate(date: Date){

    const NASAGallery = await prisma.nASAGallery.findFirst({
        where: {
            photoDate: date
        }
    });
    return NASAGallery;

}

async function incrementViews(id: number, views: number){

    await prisma.nASAGallery.update({
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
    getById,
    getByDate,
    incrementViews
}