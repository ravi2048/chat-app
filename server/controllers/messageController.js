const Message = require('../models/messageModel');

module.exports = {
    addMessage: async(req, res, next) => {
        try {
            const {from, to, message} = req.body;
            const resonseObj = await Message.create({
                message: { text: message },
                users: [from, to],
                sender: from
            })
            if(resonseObj) {
                return res.json({status: "SUCCESS", message: "message added successfully"});
            }
            return res.json({status: "ERROR", message: "message added successfully"});
        } catch (error) {
            next(error);
        }
    },

    getAllMessages: async(req, res, next) => {
        try {
            const { from, to } = req.body;
            const responseObj = await Message.find({
                users: {
                    $all: [from, to]
                }
            }).sort({updatedAt:1});

            const projectMessages = responseObj.map((msg) => {
                return(
                    {
                        fromSelf: msg.sender.toString() === from,
                        message: msg.message.text,
                    }
                )
            })
            // console.log(`####### ${responseObj}`);
            res.json(projectMessages);
        } catch (error) {
            next(error);
        }
    }
}