const mongoose = require('mongoose');

let workItemSchema = mongoose.Schema({
    title: {
        type: String
    },
    coverImage: {
        type: String
    },
    liveDemo: {
        type: String
    },
    githubRepo: {
        type: String
    },
    description: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('WorkItem', workItemSchema);