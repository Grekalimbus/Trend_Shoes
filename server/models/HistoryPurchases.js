const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', schema);
