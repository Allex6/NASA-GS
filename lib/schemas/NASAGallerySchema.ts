import joi from 'joi';

const NASAGallerySchema = joi.object({
	photoDate: joi.date().required(),
	url: joi.string().uri().required(),
	views: joi.number().required(),
	mediaType: joi.string().valid('image', 'video').required()
});

export default NASAGallerySchema;