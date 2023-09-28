const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1]
    if(token){
        let decoded=jwt.verify(token,"blog");
        if(decoded){
            req.body.userId=decoded.userId;
            req.body.username=decoded.username;
            req.body.date=Date.now();
            next()
        } else{
            res.status(400).json({msg:"Please Login first"})
        }
    }else{
        res.status(400).json({msg:"Please Login"})
    }
}

module.exports=auth