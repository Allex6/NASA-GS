import app from '../../lib/app';
import supertest from 'supertest';
import prisma from '../../lib/databases/prisma';
import { registerAndLogin } from '../factories/userFactory';

const agent = supertest(app);

beforeAll(async () => {

    await prisma.usersImages.deleteMany({});
    await prisma.aPODImages.deleteMany({});
    await prisma.users.deleteMany({});

});

afterAll(async () => await prisma.$disconnect());

describe('NasaGallery Routes', () => {

    test('GET /NasaGallery?search - should fail to return search results from nasa gallery api when no query is provided, and return 400 status code', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/NasaGallery?search=').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);

    });

    test('GET /NasaGallery?search - should fail to return search results from nasa gallery api when user is not logged in, and return 401 status code', async () => {

        const response = await agent.get('/NasaGallery?search=moon');
        expect(response.status).toBe(401);

    });

    test('GET /NasaGallery?search - should return search results from nasa gallery api when user is logged in, and return 200 status code', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/NasaGallery?search=moon').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

    });

    test('GET /NasaGallery/:id - should fail to return a specific image from gallery when invalid id is provided, and return 404 status code', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/NasaGallery/0').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);

    });

    test('GET /NasaGallery/:id - should fail to return a specific image from gallery when user is not logged in, and return 401 status code', async () => {

        const response = await agent.get('/NasaGallery/1');
        expect(response.status).toBe(401);

    });

    test('GET /NasaGallery/:id - should return a specific image from gallery when user is logged in, and return 200 status code', async () => {

        const token = await registerAndLogin(agent);
        const gallerySearchResponse = await agent.get('/NasaGallery?search=moon').set('Authorization', `Bearer ${token}`);
        const response = await agent.get(`/NasaGallery/${gallerySearchResponse.body[0].id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('photoDate');
        expect(response.body).toHaveProperty('url');
        expect(response.body).toHaveProperty('views');
        expect(response.body).toHaveProperty('mediaType');

    });

});