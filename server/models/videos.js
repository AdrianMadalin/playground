const mongoose = require('mongoose');
const VideoSchema = mongoose.Schema({
    url: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Video', VideoSchema);
