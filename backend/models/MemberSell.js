const mongoose = require('mongoose');


const sellSchema = new mongoose.Schema({

    memberid: {
        type: String,
        required: true
    },

    Sellprice: {
        type: Number,
        required: true
    }

})


const Selllist = mongoose.model("Selllist", sellSchema);

module.exports = Selllist;