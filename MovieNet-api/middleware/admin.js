
function admin(req,res,next){
    if(!req.user.isAdmin) return res.status(403).send('forbidden access');
    next();
}

module.exports = admin;