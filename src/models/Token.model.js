const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

module.exports = model('Token', TokenSchema);
