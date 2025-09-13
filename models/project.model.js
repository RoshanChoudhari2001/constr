const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  location: { type: String, required: true },
  cost: { type: Number, required: true },
  startDate: { type: Date, required: true },
  completeDate: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
