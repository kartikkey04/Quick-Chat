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
});

router.get("/get-all-users", authMiddleware, async(req, res) => {
    try{
        const userId = req.userId;
        const allUsers = await User.find({_id:{$ne:userId}});

        res.status(200).json({
            message: "All user fetched successfully",
            success: true,
            data: allUsers,
        })

    }catch(error){

        res.status(500).json({
            messsage: error.message,
            success: false
        })
        
    }
})

module.exports = router;