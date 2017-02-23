const mongoose = require('mongoose');

let invalidTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('InvalidToken', invalidTokenSchema);