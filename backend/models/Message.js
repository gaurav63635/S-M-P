const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({

    memberid: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }

})


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;