const mongoose = require('mongoose');

const savedInventionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    selectedItems: {
      type: [String],
      required: true
    },
    invention: {
      name: { type: String, required: true },
      idea: { type: String },
      problemSolved: { type: String },
      marketDemand: { type: String },
      complexity: { type: String },
      environment: { type: String },
      price: { type: String },
      scores: {
        uselessness: Number,
        creativity: Number,
        ridiculousness: Number,
        wasteOfMoney: Number,
        overall: Number
      },
      roast: { type: String },
      imagePrompt: { type: String }
    },
    imageUrl: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('SavedInvention', savedInventionSchema);
