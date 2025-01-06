const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const adminSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    tokens: [
        {
            token: {
                type: String
            }
        }
    ]

})

adminSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();
})


adminSchema.methods.generateAuthToken = async function () {
    try {
        const payload = {
            username: this.username,
            password: this.password
        };
        let token = jwt.sign(payload, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        this.save();
        return token;
    } catch (error) {
        console.log("error", error);
    }
}


const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
