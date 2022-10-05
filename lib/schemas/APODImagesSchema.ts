import joi from 'joi';

const APODImagesSchema = joi.object({
	photoDate: joi.date().required(),
	url: joi.string().uri().required(),
	views: joi.number().required()
});

export default APODImagesSchema;