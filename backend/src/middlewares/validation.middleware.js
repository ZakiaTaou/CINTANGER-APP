import jio from 'joi';

const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const {error,value}= schema.validate(req.body,{
            abortEarly: false,
            stripUnknown: true,

        });
        if (error){
            return res.status(400).json({
                message: 'Validation error',
                errors: error.details.map((err) => err.message),
            });
        }
        req.body = value;// sanitized data
        next(); //on laisse passer au middleware suivant
    };
};
export default validationMiddleware;