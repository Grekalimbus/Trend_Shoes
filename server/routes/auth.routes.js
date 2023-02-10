const express = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/token.service');
const Token = require('../models/Token');
const router = express.Router({ mergeParams: true });

// 1. get data from req (email, password)
// 2. check if user ready exists
// 3. hash password
// 4. create user
// 5. generate tokens

// =========
// register
router.post('/signUp', [
  check('email', 'Некоректный email').isEmail(),
  check('password', 'Минимальная длинна пароля 6 символов').isLength({
    min: 6,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array(),
          },
        });
      }
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
  },
]);

// =========
// loginIn
// 1. validate
// 2. find user (найти пользователя)
// 3. compare hashPassword (сравнить хеш пароль)
// 4. generate token
// 5. return data
router.post('/signInWithPassword', [
  check('email', 'Некоректный email').normalizeEmail().isEmail(),
  check('password', 'Пароль не может быть пустым').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array(),
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400,
          },
        });
      }
      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка, попробуйте позже',
      });
    }
  },
]);

// =========
// refreshToken

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post('/token', async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const tokens = await tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

module.exports = router;
