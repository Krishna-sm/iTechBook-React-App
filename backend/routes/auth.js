const express = require("express");
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_SCREAT_SIGN="heythisiskrishnab$%#ansal@*&#$";
const fetch_user = require('../middleware/FetchUser');





//Route 1: create a user using post "/api/auth/createuser"; doesn't require auth login not required
router.route('/createuser').post([
    body('email','enter a valid email').isEmail(),
    body('name','enter a valid name ').isLength({min:5}),
    body('password','password must be mininum length 5 characters').isLength({min:5}),
],async(req,res)=>{
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success:false, errors: errors.array() });
      }

      // check wether the user with this email is required

    try {
        let user= await User.findOne({email:req.body.email});
        if(user)
        {
          return   res.status(400).json({success:false,
              error:"sorry the user Already Exist"
          });
      
        }
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(req.body.password,salt);
    
         user = await User.create({
          name:req.body.name,
          email:req.body.email,
          password:passHash
        });

        // jwt implement

        const payload ={
          user:{
            id:user._id
          }
        }

        const authtoken=await jwt.sign(payload,JWT_SCREAT_SIGN,{
          expiresIn:"5d"
      });
  
      res.send({success:true,authtoken});
    } catch (error) {
        // console.log({success:false,error:error.message});
        res.status(500).send({success:false,error:"some error occoured"});
    }
})

// Route:2 Authencate a user using post "/api/auth/login"; doesn't require auth login not required

router.route('/login').post([
    body('email','Enter a valid Email address').isEmail(),
    body('password','Password Can not Be Blank').exists()
],async(req,res)=>{
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });

    }
    
    try {
      const {email,password}=req.body;
            const user = await User.findOne({email});
            if(!user)
            {
             return   res.status(400).send({error:"plese try to login with Correct details"});
            }

            const passwordCompare =await bcrypt.compare(password,user.password);
            if(!passwordCompare)
            {
             return  res.status(400).send({error:"plese try to login with Correct details"});
            }

            const payload ={
              user:{
                id:user._id
              }
            }

            const authtoken=await jwt.sign(payload,JWT_SCREAT_SIGN,{
              expiresIn:"5d"
          });
    
        res.send({success:true,authtoken});
        } catch (error) {
          res.status(500).send({success:false,error:"Internal Server Error"});
            
        }


})


// Route:2 get a user using post "/api/auth/getuser"; doesn't require auth login  required
router.route('/getuser').post(fetch_user,async(req,res)=>{
  try {
    const  userId=req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send({success:true,user});
  } catch (error) {
    res.status(500).send({success:false,error:"Internal Server Error"});
  }
})


module.exports=router;