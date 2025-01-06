const express = require('express');
const router = express.Router();
const Rent = require('../models/MemberRent');


router.post("/memberrent", async (req, res) => {
    let success = false
    const { memberid, Rentprice } = req.body;

    if (!memberid || !Rentprice) {
        return res.status(400).json({ success, error: "please fill all the fields properly" });
    } else {
        try {
            const newrentlist = new Rent({ memberid, Rentprice });

            const saved = await newrentlist.save();
            if (saved) {
                success = true
                return res.status(201).json({ success, message: "Member rent details submitted successfully" });
            } else {
                success = false
                return res.status(404).json({ success, error: "Member rent details not submitted" });
            }

        } catch (error) {
            console.log("error", error);
            return res.status(500).json({ success, error: "Internal server error" });
        }
    }

})


router.get("/rentlist/:id", async (req, res) => {
    try {
        const response = await Rent.findOne({ memberid: req.params.id });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Rent details not found" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.get("/rentlist", async (req, res) => {
    try {
        const data = await Rent.find();
        if (data) {
            res.status(200).send({ data });
        } else {
            res.status(404).json({ error: "Rent details not found" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.patch("/rentlist/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await Rent.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if (data) {
            res.status(201).json({ message: "Rent details updated", data });
        } else {
            res.status(400).json({ error: "Rent data not updated" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


router.delete("/rentlist/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const member = await Rent.findByIdAndDelete(_id);
        if (member) {
            res.status(200).json({ message: "Rent details deleted successfully" });
        } else {
            res.status(404).json({ error: "error occurs" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error occurs", error });
    }
})


module.exports = router;