const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    history: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = model('HistoryPurchases', schema);
