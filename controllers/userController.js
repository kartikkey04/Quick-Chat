const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/user");

// Get current user details
router.get("/get-logged-user", authMiddleware, async(req, res) => {

    try{
        const user = await User.findOne({ _id: req.userId });

        res.status(200).json({
            message: "User fetched successfully",
            success: true,
            data: user,
        })

    }catch(error){
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;