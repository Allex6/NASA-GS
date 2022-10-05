import app from "../../lib/app";
import supertest from 'supertest';
import { createUser, registerAndLogin } from "../factories/userFactory";
import prisma from './../../lib/databases/prisma';

const agent = supertest(app);

beforeAll(async () => {

    await prisma.usersImages.deleteMany({});
    await prisma.aPODImages.deleteMany({});
    await prisma.users.deleteMany({});

});

afterAll(async () => await prisma.$disconnect());

describe('Users Routes', () => {

    test('POST /users - should fail to register a new user when passing email already registered, and return 409 status code', async () => {

        const user = createUser();
        await agent.post('/users').send(user);

        const response = await agent.post('/users').send(user);
        expect(response.status).toBe(409);
        expect(response.text).toBe('Email already registered.');

    });

    test('POST /users - should fail to register a new user when passing invalid data, and return 422 status code', async () => {

        const user = createUser();
        user.email = 'invalidEmail';

        const response = await agent.post('/users').send(user);
        expect(response.status).toBe(422);

    });

    test('POST /users - should register a new user, and return 201 status code', async () => {
        
        const user = createUser();
        const response = await agent.post('/users').send(user);
        expect(response.status).toBe(201);

    });

    test('POST /users/login - should fail to login when passing invalid data, and return 422 status code', async () => {

        const user = createUser();
        const response = await agent.post('/users/login').send(user);
        expect(response.status).toBe(422);

    });

    test('POST /users/login - should do login, return a valid jwt token and 200 status code', async () => {

        const user = createUser();
        await agent.post('/users').send(user);

        const loginData = {
            email: user.email,
            password: user.password
        };

        const response = await agent.post('/users/login').send(loginData);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy();
        expect(response.body.token).not.toBe('');

    });

    test('GET /gallery - should fail to return a list of images without a valid token, and return 401 status code', async () => {

        const response = await agent.get('/users/gallery');
        expect(response.status).toBe(401);

    });

    test('GET /gallery - should return a list of images, and return 200 status code', async () => {

        const token = await registerAndLogin(agent);
        const response = await agent.get('/users/gallery').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

    });

});