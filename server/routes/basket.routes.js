const express = require('express');
const Basket = require('../models/Basket');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');
const chalk = require('chalk');

// getAllBasket
router.get('/', async (req, res) => {
  try {
    const list = await Basket.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// getBasketId
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Basket.find();
    const basketById = list.filter((item) => {
      return JSON.stringify(item.user) === JSON.stringify(id);
    });
    res.status(200).send(basketById);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// changeBasketId
router.patch('/:id', async (req, res) => {
  try {
    const list = await Basket.find();
    const { id } = req.params;
    const basketById = list.filter((item) => {
      return JSON.stringify(item.user) === JSON.stringify(id);
    });
    const idBasket = basketById[0]._id;
    const listById = await Basket.findById(idBasket);
    delete listById._id;

    const newData = { user: listById.user, basket: req.body };
    await listById.update(newData);
    res.status(200).send(newData);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// change userBasket productID
router.put('/:id', async (req, res) => {
  try {
    const list = await Basket.find();
    const { id } = req.params;
    const basketById = list.filter((item) => {
      return JSON.stringify(item.user) === JSON.stringify(id);
    });
    const idBasket = basketById[0]._id;
    const listById = await Basket.findById(idBasket);

    delete listById._id;

    const newData = { user: listById.user, basket: req.body };
    await listById.update(newData);
    res.status(200).send(newData);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

module.exports = router;
