const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: ['food', 'transportation', 'housing', 'utilities', 'entertainment', 'healthcare', 'other']
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense; 