const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose
require('./category');

const productSchema = require('./productSchema');

module.exports = mongoose.model('Product', productSchema);