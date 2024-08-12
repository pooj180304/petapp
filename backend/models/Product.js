const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Name of the product
  price: { type: String, required: true },         // Price of the product
  quantity: { type: Number, required: true },      // Quantity available in stock
  image: { type: String, required: true },         // Image filename for the product
  category: { type: String, required: true },      // Category of the product (e.g., dogs, cats)
  description: { type: String },                   // Optional: Description of the product
  tags: [{ type: String }]                         // Optional: Tags for search or filtering
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
