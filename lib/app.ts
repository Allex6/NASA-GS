import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import usersRouter from './routers/usersRouter';
import APODImagesRouter from './routers/APODImagesRouter';
import NASAGalleryRouter from './routers/NASAGalleryRouter';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/APODImages', APODImagesRouter);
app.use('/NASAGallery', NASAGalleryRouter);

app.use(errorHandler);

export default app;