const User = require("./user.model");
const bcrypt = require('bcrypt');

module.exports.Signup = async(req,res,next)=>{
    try {
        const data = req.body
        const result = await User.create(req.body)

        res.status(200).json({
            message:"User created successfully",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to create user",
            error:error.message
        })
    }
}

module.exports.login =async(req,res,next)=>{
    try {
        const {email,pass} = req.body
        
        if(!email || !pass){
            return res.status(403).json({
                status:"fail",
                message:"Please provide credentials"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(403).json({
                status:"fail",
                message:"No user with this credentials was found"
            })
        }

        const isPasswordValid =bcrypt.compareSync(pass,user.password)
        if(!isPasswordValid){
            return res.status(403).json({
                status:"fail",
                message:"Wrong password"
            })
        }
        const {password,...other} = user.toObject()
        res.status(200).json({
            message:"Login successful",
            data:user
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Failed to login"
        })
    }
}