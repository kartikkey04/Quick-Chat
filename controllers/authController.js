const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../../config.env'});

router.post("/signup", async (req, res) => {

  const {email, password, ...otherFields} = req.body;
  try {
    //Check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        message: "User already exist",
        success: false,
      });
    }

    //Hash password
    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hasedPassword,
      ...otherFields
    });

    const savedUser = await newUser.save();

    const userForClient = {
      _id: savedUser._id,
      email: savedUser.email,
    }

    return res.status(201).send({
        message: 'User created successfully',
        success: true,
        user: userForClient,
    })

  } catch (error) {
    return res.status(500).send({
      message: error.message || "Failed to create user",
      success: false,
    });
  }
});

router.post("/login", async(req, res) => {

  const {email, password} = req.body;

  try{
    // Find user by email
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).send({
        message: "User does not exist",
        success: false,
      })
    }

    // Check password
    console.log("pass:",password);
    console.log("pass:",user.password);
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
      return res.status(400).send({
        message: "Invalid credentials",
        success: false
      })
    }

    // Generate JWT token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    const userForClient = {
      _id: user._id,
      email: user.email,
    };

    return res.status(200).send({
      message: "User logged in successfully",
      success: true,
      token,
      user: userForClient,
    })

  }catch(error){
    return res.status(500).send({
      message: error.message || "Login failed due to server error",
      success: false,
    })
  }
});

module.exports = router;


