

exports.errorHandler = (err, req, res, next) =>{
    
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err , status : 0 });
    }
    // default to 500 server error
    return res.status(500).json({ message: err.message , status : 0 });
}