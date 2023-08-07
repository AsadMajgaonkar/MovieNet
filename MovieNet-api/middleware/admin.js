
function admin(req,res,next){
    if(!req.user.isAdmin) return res.status(400).send('forbidden access');
    next();
}

module.exports = admin;