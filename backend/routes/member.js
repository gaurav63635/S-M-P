const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Member = require('../models/Member');
const Society = require('../models/Society');
const upload = require('../uploads/upload');


router.post("/addmember", upload, async (req, res) => {
    console.log(req.body);
    let success = false
    const { firstname, lastname, email, mobile, DOB, totalmembers, society, houseno, username, password } = req.body;
    const photo = req.file ? req.file.path : '';

    if (!firstname || !lastname || !email || !mobile || !DOB || !totalmembers || !society || !houseno || !photo || !username || !password) {
        return res.status(400).json({ success, error: "please fill all the fields properly" });
    } else {
        // Check if society exists
        const societyDoc = await Society.findOne({ name: society });
        if (!societyDoc) {
            return res.status(400).json({ success, error: "Society not found." });
        }

        const userexist = await Member.findOne({ email: email });

        if (userexist) {
            return res.status(401).json({ success, error: "Staff already exists with same email" });
        } else {
            try {
                const newstaff = new Member({
                    firstname, lastname, email, mobile, DOB, totalmembers, society: societyDoc._id, houseno, photo, username, password
                });

                const saved = await newstaff.save();
                if (saved) {
                    success = true
                    return res.status(201).json({ success, message: "Member added successfully" });
                } else {
                    success = false
                    return res.status(201).json({ success, error: "Member not added" });
                }

            } catch (error) {
                console.log("error", error);
                return res.status(500).json({ success, error: "Internal server error" });
            }
        }
    }

})


router.get("/getmember", async (req, res) => {
    try {
        const response = await Member.find();
        res.status(201).json(response);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.get('/member/:id', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }
        res.status(200).send({ member });
    } catch (error) {
        res.status(500).json({ error: "Server error occurs", error });
    }
});


router.get('/getmembersbysociety/:societyid', async (req, res) => {
    try {
        const members = await Member.find({ society: req.params.societyid });
        if (members.length === 0) {
            return res.status(404).json({ message: "Members not found" });
        }
        res.status(200).send({ members });
    } catch (error) {
        res.status(500).json({ error: "Server error occurs", error });
    }
});


router.patch("/member/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const member = await Member.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if (member) {
            res.status(201).json({ message: "Member details updated", member });
        } else {
            res.status(400).json({ error: "Member data not updated" });
        }
    } catch (err) {
        res.status(500).log(err);
    }
})


router.patch("/memberpassword/:id", async (req, res) => {
    const { cpassword, password } = req.body;

    if (!cpassword || !password) {
        return res.status(400).json({ error: "Please fill all the fields properly" });
    }

    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        const isMatch = await bcrypt.compare(cpassword, member.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect current password" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        member.password = hashedPassword;
        const updatedMember = await member.save();

        res.status(201).json({ message: "Password updated successfully", member: updatedMember });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/member/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const member = await Member.findByIdAndDelete(_id);
        res.status(200).send({ message: "Member deleted successfully", member });
    } catch (error) {
        res.status(500).json({ error: "Server error occurs", error });
    }
})


module.exports = router;