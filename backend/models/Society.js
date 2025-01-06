const mongoose = require('mongoose');


const societySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    houses: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pincode: {
        type: Number,
        required: true
    }

})


const Society = mongoose.model("Society", societySchema);

module.exports = Society;