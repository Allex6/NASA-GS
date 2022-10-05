import { faker } from '@faker-js/faker';
import { userCreateData } from '../../lib/types/userCreateData';

function createUser(): userCreateData {

    return {
        name: faker.name.firstName(),
        birthDate: faker.date.past(50),
        email: faker.internet.email(),
        password: faker.internet.password()
    }

};

async function registerAndLogin(agent: any): Promise<string> {

    const user = createUser();
    await agent.post('/users').send(user);

    const loginData = {
        email: user.email,
        password: user.password
    };

    const response = await agent.post('/users/login').send(loginData);
    return response.body.token;

}

export {
    createUser,
    registerAndLogin
}