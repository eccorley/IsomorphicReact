var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    id: Number,
    title: String,
    author: String,
    body: String,
    created: Date
});

module.exports = mongoose.model('Post', Post);