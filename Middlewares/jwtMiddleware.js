 const jwt=require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
console.log('inside jwt middleware');
const token = req.headers['authorization'].split(" ")[1]

try{
    const jwtResponse = jwt.verify(token,"superpswd")
    console.log(jwtResponse);
    req.payload = jwtResponse.userId
    next()
    // console.log(token)
}catch(errr){
res.status(401).json("Authorization failed!! please Login")

}


}


module.exports = jwtMiddleware