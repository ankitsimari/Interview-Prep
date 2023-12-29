const jwt = require('jsonwebtoken');


const auth = async (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    try{
        jwt.verify(token, 'ankit', async(err, decoded)=> {
            console.log(decoded.user.email)
            if(decoded){
                req.body.email = decoded.user.email
                req.body.name = decoded.user.name;
                next()
            }else{
                res.status(200).send("loginFirst")
            }
            
          });

    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
}

module.exports={auth}