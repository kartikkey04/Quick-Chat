const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../../config.env'});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.send({
        message: "User already exist",
        success: false,
      });
    }

    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hasedPassword;

    const newUser = new User(req.body);

    await newUser.save();

    return res.send({
        message: 'User created successfully',
        success: true
    })

  } catch (error) {
    return res.send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/login", async(req, res) => {

  try{

    const user = await User.findOne({email: req.body.email});

    if(!user){
      return res.send({
        message: "User does not exist!!!",
        success: false
      })
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if(!isValid){
      return res.send({
        message: "invalid user!!!",
        success: false
      })
    }

    const token = jwt.sign({userId: User._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    return res.send({
      message: "User logged in successfully",
      success: true,
      token: token
    })

  }catch(error){
    return res.send({
      message: error.message,
      success: false
    })
  }

})

module.exports = router;


