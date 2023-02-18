const express = require('express');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // userId === current user _id
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: 'UnAuthOrized' });
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

router.patch('/:userId/balance', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = User.findById(userId);
    const newDataUser = {
      email: userData.email,
      password: userData.password,
      balance: req.body.balance,
    };

    // userId === current user _id
    if (JSON.stringify(userId) === JSON.stringify(req.user._id)) {
      const updatedUser = await User.findByIdAndUpdate(userId, newDataUser, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: 'UnAuthOrized' });
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

router.get('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await User.findById(userId);
    if (userId === req.user._id) {
      res.send(list);
    } else {
      res.status(401).json({ message: 'UnAuthOrized' });
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

module.exports = router;
