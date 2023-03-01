const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    basket: { type: Array },
  },
  { timestamps: true }
);

module.exports = model('Basket', schema);
