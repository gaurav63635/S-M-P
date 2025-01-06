const express = require('express');
const router = express.Router();
const Society = require('../models/Society');


router.post("/addsociety", async (req, res) => {
    const { name, houses, address, city, pincode } = req.body;

    if (!name || !houses || !address || !city || !pincode) {
        res.status(404).json({ error: "please fill all the fields properly" });
    } else {
        try {
            const data = new Society(req.body);
            const saved = await data.save();
            if (saved) {
                res.status(201).json({ message: "Society data saved successfully" });
            } else {
                res.status(400).json({ error: "Society data not saved please try again" });
            }
        } catch (error) {
            res.status(500).json({ error: "Server error occurs" });
        }
    }
})


router.get("/allsociety", async (req, res) => {
    try {
        const data = await Society.find();
        res.status(200).send({ data: data });
    } catch (error) {
        res.status(500).json({ error: "Server error occurs" });
    }
})


router.get("/getsociety/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Society.findById(id);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: "Server error occurs" });
    }
})


router.delete("/deletesociety/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Society.findByIdAndDelete(id);
        res.status(200).json({ message: "Society data deleted successfully", data });
    } catch (error) {
        res.status(500).json({ error: "Server error occurs" });
    }
})


module.exports = router;