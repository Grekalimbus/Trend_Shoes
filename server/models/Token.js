const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // id того юзера, который сейчас актуален
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Token', schema);
