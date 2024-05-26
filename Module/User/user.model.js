const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide Name"]
    },
    email:{
        type:String,
        required:[true,"Please provide Email"],
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please provide Password"],
        validate:{
            validator:value=>{
                validator.isStrongPassword(value,{
                    minLength:6,
                    minLowercase:1,
                })
            }
        }
    },
    confirmPassword:{
        type:String,
        required:[true,"Please provide Password"],
        validate:{
            validator:value=>{
                validator.isStrongPassword(value,{
                    minLength:6,
                    minLowercase:1,
                })
            }
        }
    },
    phoneNumber:{
        type:String,
        required:[true,"Please provide Phone Number"],
    }
},
    {
        timeStamps:true
    }
)

userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (!err) {
          this.password = hash
          this.confirmPassword = undefined
          next()
        }
        if (err) this.password.message = err
      })
    })
  })

  const User = mongoose.model('User',userSchema)

  module.exports = User;

