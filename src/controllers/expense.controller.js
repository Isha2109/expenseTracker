const Expense = require('../models/expense.model');
const schemas = require('../utils/validation.schemas');


const createExpense = async (req, res) => {
  try {
    const { error } = schemas.expense.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    const expense = new Expense({
      ...req.body,
      user: req.user._id
    });

    await expense.save();

    res.status(201).json({
      status: 'success',
      data: { expense }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const expenses = await Expense.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Expense.countDocuments({ user: req.user._id });

    res.json({
      status: 'success',
      data: {
        expenses,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};


const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!expense) {
      return res.status(404).json({
        status: 'error',
        message: 'Expense not found'
      });
    }

    res.json({
      status: 'success',
      data: { expense }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Update expense
 */
const updateExpense = async (req, res) => {
  try {
    const { error } = schemas.expense.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        status: 'error',
        message: 'Expense not found'
      });
    }

    res.json({
      status: 'success',
      data: { expense }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!expense) {
      return res.status(404).json({
        status: 'error',
        message: 'Expense not found'
      });
    }

    res.json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

const getExpenseReport = async (req, res) => {
  try {
    const { error } = schemas.expenseReport.validate(req.query);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    const { startDate, endDate, category } = req.query;
    const query = { user: req.user._id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (category) {
      query.category = category;
    }

    const expensesByCategory = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const totalExpenses = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      status: 'success',
      data: {
        byCategory: expensesByCategory,
        total: totalExpenses[0] || { total: 0, count: 0 }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseReport
}; 