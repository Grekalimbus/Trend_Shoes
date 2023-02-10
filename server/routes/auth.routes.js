const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/token.service');
const router = express.Router({ mergeParams: true });

// 1. get data from req (email, password)
// 2. check if user ready exists
// 3. hash password
// 4. create user
// 5. generate tokens

// =========
// register
router.post('/signUp', async (req, res) => {
  try {
    const { email, password } = await req.body; // здесь хранятся данные, которые юзер отправляет методом post

    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({
        error: {
          message: 'EMAIL_EXISTS',
          code: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // шифрование пароля
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    const tokens = tokenService.generate({ _id: newUser._id });
    await tokenService.save(newUser._id, tokens.refreshToken);
    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// =========
router.post('/signInWithPassword', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// =========
router.post('/token', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

module.exports = router;
