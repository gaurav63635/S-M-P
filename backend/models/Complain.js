const mongoose = require('mongoose');


const complainSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },

    about: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }

})


const Complain = mongoose.model("Complain", complainSchema);

module.exports = Complain;