const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const memberSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobile: {
        type: Number,
        required: true,
        unique: true,
    },

    DOB: {
        type: String,
        required: true
    },

    totalmembers: {
        type: String,
        required: true
    },

    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    },

    houseno: {
        type: Number,
        required: true
    },

    photo: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

})


memberSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();
})


memberSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log("error", error);
    }
}


const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
