import { Router } from 'express';
import NASAGalleryController from '../controllers/NASAGalleryController';
import authValidator from '../middlewares/authValidator';
import schemaValidator from '../middlewares/schemaValidator';
import NASAGallerySchema from '../schemas/NASAGallerySchema';

const router = Router();

router.post('/', 
    schemaValidator(NASAGallerySchema), 
    NASAGalleryController.createNASAGallery
);

router.get('/',
    authValidator,
    NASAGalleryController.search
);

router.get('/:id',
    authValidator,
    NASAGalleryController.getById
);

export default router;