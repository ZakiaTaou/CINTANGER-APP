const errorMiddleware = (err, req , res , next) =>{
    console.error(err);// log for debuging

    const statuscode=  err.statuscode || 500;

    const message = err.message || 'Internal Server Error';
    res.status(statuscode).json({
        success: false,
        message,

    });
};

export default errorMiddleware;
