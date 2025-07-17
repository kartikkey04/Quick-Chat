const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt')

module.exports = router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.send({
        message: "User already exist",
        success: false,
      });
    }

    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hasedPassword;

    const newUser = new User(req.body);

    await newUser.save();

    res.send({
        message: 'User created successfully',
        success: true
    })

  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});


