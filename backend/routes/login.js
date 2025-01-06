const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Member = require('../models/Member');



router.post("/admin", async (req, res) => {
    try {
        const data = new Admin(req.body);
        const saved = await data.save();
        if (saved) {
            success = true
            return res.status(201).json({ success, message: "Admin added successfully" });
        } else {
            success = false
            return res.status(201).json({ success, error: "Admin not added" });
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ success, error: "Internal server error" });
    }
})


router.post("/adminlogin", async (req, res) => {
    let success = false
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success, error: "please fill all the fields properly" });
    } else {
        const userexist = await Admin.findOne({ username: username });

        if (!userexist) {
            return res.status(401).json({ success, error: "Invalid credentials" });
        } else {
            try {
                const ismatch = await bcrypt.compare(password, userexist.password);

                if (ismatch) {
                    const token = await userexist.generateAuthToken();
                    success = true
                    return res.status(201).json({ success, token, message: "admin login successfully" });
                } else {
                    success = false
                    return res.status(404).json({ success, error: "Invalid credentials" });
                }
            } catch (error) {
                console.log("error", error);
                return res.status(500).json({ success, error: "Internal server error" });
            }
        }
    }
})


router.post("/memberlogin", async (req, res) => {
    let success = false
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success, error: "please fill all the fields properly" });
    } else {
        const userexist = await Member.findOne({ email: email });

        if (!userexist) {
            return res.status(401).json({ success, error: "Invalid credentials" });
        } else {
            try {
                const ismatch = await bcrypt.compare(password, userexist.password);
                
                if (ismatch) {
                    success = true
                    const token = await userexist.generateAuthToken();
                    return res.status(200).json({ success, token, message: "Member login successfully" });
                } else {
                    success = false
                    return res.status(404).json({ success, error: "Invalid credentials" });
                }
            } catch (error) {
                console.log("error", error);
                return res.status(500).json({ success, error: "Internal server error" });
            }
        }
    }
})


module.exports = router;