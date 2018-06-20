const mongoose = require('mongoose');
const url = 'mongodb://adi:123qwe@ds261660.mlab.com:61660/playground_test';

module.exports = mongoose.connect(url);