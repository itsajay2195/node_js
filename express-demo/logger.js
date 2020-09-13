
function log(req,res,next){
    console.log("into the middleware")
    next();
}



module.exports = log;