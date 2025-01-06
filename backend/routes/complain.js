const express = require('express');
const router = express.Router();
const Complain = require('../models/Complain');



router.post("/complain", async (req, res) => {
    let success = false
    const { id, about, message } = req.body;

    if (!id || !about || !message) {
        return res.status(400).json({ success, error: "please fill all the fields properly" });
    } else {
        try {
            const newcomplain = new Complain({ id, about, message });

            const saved = await newcomplain.save();
            if (saved) {
                success = true
                return res.status(201).json({ success, message: "Complain details submitted successfully" });
            } else {
                success = false
                return res.status(201).json({ success, error: "Complain details not submitted" });
            }

        } catch (error) {
            console.log("error", error);
            return res.status(500).json({ success, error: "Internal server error" });
        }
    }

})


router.get('/complain/:id', async (req, res) => {
    try {
        const complain = await Complain.find({ id: req.params.id });
        if (!complain) {
            return res.status(404).json({ error: "Complain not found" });
        }
        res.status(200).send({ complain });
    } catch (error) {
        res.status(500).json({ error: "Server error occurs", error });
    }
});


module.exports = router;