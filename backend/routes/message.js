const express = require('express');
const router = express.Router();
const Message = require('../models/Message');



router.post("/message", async (req, res) => {
    let success = false
    const { memberid, name, subject, message } = req.body;

    if (!memberid || !name || !subject || !message) {
        return res.status(400).json({ success, error: "please fill all the fields properly" });
    } else {
        try {
            const newmessage = new Message({ memberid, name, subject, message });

            const saved = await newmessage.save();
            if (saved) {
                success = true
                return res.status(201).json({ success, message: "Message submitted successfully" });
            } else {
                success = false
                return res.status(201).json({ success, error: "Message not submitted" });
            }

        } catch (error) {
            console.log("error", error);
            return res.status(500).json({ success, error: "Internal server error" });
        }
    }

})


router.get("/message/:id", async (req, res) => {
    try {
        const data = await Message.find({ memberid: req.params.id });
        res.status(200).send({ data });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ success, error: "Internal server error" });
    }
})


router.delete("/message/:id", async (req, res) => {
    try {
        const data = await Message.findByIdAndDelete(req.params.id);
        if (data) {
            res.status(201).json({ message: "Message deleted successfully" });
        } else {
            res.status(400).json({ error: "Message not deleted" });
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ success, error: "Internal server error" });
    }
})


module.exports = router;