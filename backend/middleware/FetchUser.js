const jwt = require("jsonwebtoken");
const JWT_SCREAT_SIGN="heythisiskrishnab$%#ansal@*&#$";

const fetchUser=async(req,res,next)=>{
    try {
        // get the usr from the jwt token and add id to req object
        const token = req.header('auth-token');
        if(!token)
        {
            return res.status(401).send({error:"plese authenticate with valid token"});

        }
        const data =await jwt.verify(token,JWT_SCREAT_SIGN);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);     
               return res.status(401).send({error:"plese authenticate with valid token"});

    }
}
module.exports=fetchUser;