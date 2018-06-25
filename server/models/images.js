const mongoose = require('mongoose');
const ImageSchema = mongoose.Schema({
    name: {type: String, required: true},
    path: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
});

const ImageModel = module.exports = mongoose.model('Image', ImageSchema);

module.exports.addImage = (req, file, callback) => {
    const url = req.protocol + '://' + req.get('host');
    const newImage = new ImageModel({
        name: file.filename,
        path: url + '/images/' + file.filename,
    });
   newImage.save(callback);
};