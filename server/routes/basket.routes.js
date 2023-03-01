const express = require('express');
const Basket = require('../models/Basket');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');

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

router.get('/:id', auth, async (req, res) => {
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
    const { id } = req.params;
    const list = await Basket.findById(id);
    delete list._id;
    await list.update(req.body);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

module.exports = router;
