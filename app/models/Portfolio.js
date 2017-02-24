const mongoose = require('mongoose');

let portfolioSchema = mongoose.Schema({
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    displayURL: {
        type: String,
        required: true
    },
    works: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkItem'
    }]
});


module.exports = mongoose.model('Portfolio', portfolioSchema);