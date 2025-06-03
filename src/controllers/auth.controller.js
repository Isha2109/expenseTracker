const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const schemas = require('../utils/validation.schemas');


const signup = async (req, res) => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    const user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      status: 'success',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};


const login = async (req, res) => {
  try {
    const { error } = schemas.login.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    const isValidPassword = await user.comparePassword(req.body.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '7d' }
    );

    res.json({
      status: 'success',
      data: {
        user,
        token
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
  signup,
  login
}; 