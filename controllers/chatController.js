const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Chat = require('../models/chat');

module.exports = router.post('/create-new-chat', authMiddleware, async(req, res) => {

    try{
        const chat = new Chat(req.body);
        const savedChat = await chat.save();

        res.status(200).json({
            message: "Chat created successfully",
            success: true,
            data: savedChat
        })

    }catch(error){

        res.status(500).json({
            message: error.message,
            success: true
        })

    }

})