import { Router } from 'express';
import APODImagesController from '../controllers/APODImagesController';
import authValidator from '../middlewares/authValidator';

const router = Router();

router.get('/',
    authValidator,
    APODImagesController.todayAPODImage,
    APODImagesController.rangeAPODImages
);

router.get('/:date',
    authValidator,
    APODImagesController.getByDate
);

export default router;