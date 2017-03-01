const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

let tagSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});
tagSchema.plugin(findOrCreate);
module.exports = mongoose.model('tag', tagSchema);