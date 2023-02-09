const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    firm: { type: String, required: true },
    imgProduct: { type: Array, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', schema);
