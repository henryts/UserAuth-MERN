const bcrypt = require("bcryptjs");
const userSchema = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const  cloudinary=require('../config/cloudinary.js')
module.exports = {
  Signup: async (req, res) => {
    const { name, email, password, mobile } = req.body;
    const emailExist = await userSchema.user.findOne({ email: email });
    const mobileExist = await userSchema.user.findOne({ mobile: mobile });

    if (emailExist || mobileExist) {
      res.status(400).send({
        success: false,
        message: "Email or Phone already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new userSchema.user({
        name,
        email,
        password: hashedPassword,
        mobile,
      });

      await newUser.save();
      res.status(200).send({
        success:true,
        message:'Regitered successfully'
      })
    }
  },

  Login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema.user.findOne({ email: email });
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const userId = user._id;
        const secret = process.env.JWT_SECRET;
        const accessToken = jwt.sign({ userId, role: "user" }, secret, {
          expiresIn: "1d",
        });
        res.status(200).send({
          userInfo:user,
          success: true,
          message: "Logged in successfully",
          accessToken: accessToken
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Invalid Password",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "User Not Exists!",
      });
    }
  },

  UpdateProfile:async(req,res)=>{
      console.log(req.body);
      await userSchema.user.updateOne({_id:req.body.userId},{name:req.body.name,email:req.body.email,mobile:req.body.mobile}).then(async()=>{
        await userSchema.user.findOne({_id:req.body.userId}).then((userInfo)=>{
          res.status(200).send({
            success:true,
            message:'Profile updated successfully',
            userInfo
          })
        })

      })
  },

  uploadProfilePic:async(req,res)=>{
    const result=await cloudinary.uploader.upload(req.file.path)
    const imageUrl=result.url
    console.log(imageUrl,'gg');
    console.log(req.body);
    await userSchema.user.updateOne({_id:req.body.userId},{profilePic:imageUrl}).then(async()=>{
      await userSchema.user.findOne({_id:req.body.userId}).then((userInfo)=>{
        res.status(200).send({
          success:true,
          message:'Profile updated successfully',
          userInfo
        })
      })
    })
  },

  getUserDetails:async(req,res)=>{

  }
};


