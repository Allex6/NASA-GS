import joi from 'joi';

const usersSchema = joi.object({
	name: joi.string().required(),
	birthDate: joi.date().required(),
	email: joi.string().required().email(),
	password: joi.string().required()
});

export default usersSchema;