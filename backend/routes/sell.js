const express = require('express');
const router = express.Router();
const Sell = require('../models/MemberSell');


router.post("/membersell", async (req, res) => {
    let success = false
    const { memberid, Sellprice } = req.body;

    if (!memberid || !Sellprice) {
        return res.status(400).json({ success, error: "please fill all the fields properly" });
    } else {
        try {
            const newselllist = new Sell({ memberid, Sellprice });

            const saved = await newselllist.save();
            if (saved) {
                success = true
                return res.status(201).json({ success, message: "Member sell details submitted successfully" });
            } else {
                success = false
                return res.status(404).json({ success, error: "Member sell details not submitted" });
            }

        } catch (error) {
            console.log("error", error);
            return res.status(500).json({ success, error: "Internal server error" });
        }
    }

})


router.get("/selllist/:id", async (req, res) => {
    try {
        const response = await Sell.findOne({ memberid: req.params.id });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Sell details not found" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.get("/selllist", async (req, res) => {
    try {
        const data = await Sell.find();
        if (data) {
            res.status(200).json({ data });
        } else {
            res.status(404).json({ error: "Sell details not found" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.patch("/selllist/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await Sell.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if (data) {
            res.status(201).json({ message: "Sell details updated", data });
        } else {
            res.status(400).json({ error: "Sell data not updated" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


router.delete("/selllist/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const member = await Sell.findByIdAndDelete(_id);
        if (member) {
            res.status(200).json({ message: "Sell details deleted successfully" });
        } else {
            res.status(404).json({ error: "error occurs" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error occurs", error });
    }
})


module.exports = router;