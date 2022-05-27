const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: mongoose.SchemaTypes.ObjectID,
      ref: 'Category',
      required: true,
    },

    image: {
      type: String,
      default: 'no-image.png',
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;