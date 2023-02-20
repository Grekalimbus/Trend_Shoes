const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true }, // unique - entity должен быть уникальным
    password: { type: String },
    balance: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', schema);
