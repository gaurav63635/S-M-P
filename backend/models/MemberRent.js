const mongoose = require('mongoose');


const rentSchema = new mongoose.Schema({

    memberid: {
        type: String,
        required: true
    },

    Rentprice: {
        type: Number,
        required: true
    }

})


const Rentlist = mongoose.model("Rentlist", rentSchema);

module.exports = Rentlist;