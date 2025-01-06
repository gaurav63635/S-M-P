const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');



router.post("/contact", async (req, res) => {
    let success = false
    const { name, email, phone, desc } = req.body;

    if (!name || !email || !phone || !desc) {
        return res.status(400).json({ success, error: "please fill all the fields properly" });
    } else {
        try {
            const newcontact = new Contact({ name, email, phone, desc });

            const saved = await newcontact.save();
            if (saved) {
                success = true
                return res.status(201).json({ success, message: "Contact details submitted successfully" });
            } else {
                success = false
                return res.status(201).json({ success, error: "Contact details not submitted" });
            }

        } catch (error) {
            console.log("error", error);
            return res.status(500).json({ success, error: "Internal server error" });
        }
    }

})


module.exports = router;