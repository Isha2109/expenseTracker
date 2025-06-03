const Joi = require('joi');

const schemas = {
  signup: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  expense: Joi.object({
    amount: Joi.number().required().min(0),
    category: Joi.string()
      .required()
      .valid('food', 'transportation', 'housing', 'utilities', 'entertainment', 'healthcare', 'other'),
    description: Joi.string().required().min(3),
    date: Joi.date().default(Date.now)
  }),

  expenseReport: Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date().min(Joi.ref('startDate')),
    category: Joi.string().valid('food', 'transportation', 'housing', 'utilities', 'entertainment', 'healthcare', 'other')
  })
};

module.exports = schemas; 