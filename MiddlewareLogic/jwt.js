const jwt = require("jsonwebtoken");
async function jwtauth (req,res,next)  {
    const token = req.cookies.token
    try{
        const user = jwt.verify(token,process.env.SECRET)
        req.user = user
        next()
    }
    catch (err){
        res.clearCookie("token");
        return res.redirect('/')
    }
}

module.exports = jwtauth;
