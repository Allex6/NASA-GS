import app from "../../lib/app";
import supertest from 'supertest';
import { registerAndLogin } from "../factories/userFactory";
import prisma from './../../lib/databases/prisma';

const agent = supertest(app);

beforeAll(async () => {

    await prisma.usersImages.deleteMany({});
    await prisma.aPODImages.deleteMany({});
    await prisma.users.deleteMany({});

});

afterAll(async () => await prisma.$disconnect());

describe('APODImages Routes', () => {

    test('GET /APODImages - should fail to return a valid APOD image of today without a valid token, and return status 401', async () => {

        const response = await agent.get('/APODImages');
        expect(response.status).toBe(401);

    });

    test('GET /APODImages - should return a valid APOD image of today, and return status 200', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/APODImages').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('photoDate');
        expect(response.body).toHaveProperty('url');
        expect(response.body).toHaveProperty('views');

    });

    test('GET /APODImages?start_date&end_date - should fail to get a list of APODImages without a valid token, and return status 401', async () => {

        const response = await agent.get('/APODImages?start_date=2020-01-01&end_date=2020-01-02');
        expect(response.status).toBe(401);

    });

    test('GET /APODImages?start_date&end_date - should fail to get a list of APODImages without a valid range of dates, and return status 422', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/APODImages?start_date=2020-01-10&end_date=2020-01-05').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(422);

    });

    test('GET /APODImages?start_date&end_date - should return a list of APODImages based on range, and return 200 status code', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/APODImages?start_date=2020-06-10&end_date=2020-06-16').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

    });

    test('GET /APODImages/:date - should fail to return a valid APOD image without a valid token, and return 401 status code', async () => {

        const response = await agent.get('/APODImages/2020-06-10');
        expect(response.status).toBe(401);

    });

    test('GET /APODImages/:date - should fail to return a valid APOD image when passing an invalid date, and return 404 status code', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/APODImages/2020-06-32').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);

    });

    test('GET /APODImages/:date - should return a valid APOD image, and return 200 status code', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/APODImages/2016-06-16').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('photoDate');
        expect(response.body).toHaveProperty('url');
        expect(response.body).toHaveProperty('views');

    });

});