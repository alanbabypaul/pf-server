const users = require('../Models/userSchema')
// jwt

const jwt = require('jsonwebtoken')
// register
exports.register = async(req,res)=>{
    console.log('inside register controller function')
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json(
                {existingUser})
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }


    catch(err){
        res.status(401).json(`Register API Failed, Error :${err}`)
    }
}

// login

exports.login = async (req,res)=>{
    console.log('inside login function')
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){

const token = jwt.sign({userId:existingUser._id},"superpswd")
            res.status(200).json(
                {
                    existingUser,token
                })
        }
    }

    catch(err){
        res.status(401).json(`Login API Failed, Error :${err}`)
    }

    
}



// profileupdate
exports.editUser = async (req,res)=>{
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile:uploadImage

        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)

    }
}