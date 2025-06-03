const express = require('express');
const auth = require('../middleware/auth.middleware');
const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseReport
} = require('../controllers/expense.controller');

const router = express.Router();

router.use(auth);

router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/report/summary', getExpenseReport);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router; 