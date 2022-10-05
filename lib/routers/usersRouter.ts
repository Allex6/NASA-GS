import { Router } from 'express';
import usersController from '../controllers/usersController';
import authValidator from '../middlewares/authValidator';
import schemaValidator from '../middlewares/schemaValidator';
import loginSchema from '../schemas/loginSchema';
import usersSchema from '../schemas/usersSchema';

const router = Router();

router.post('/', 
    schemaValidator(usersSchema), 
    usersController.createUsers
);

router.post('/login', 
    schemaValidator(loginSchema), 
    usersController.login
);

router.get('/gallery',
    authValidator,
    usersController.getGallery
);

export default router;