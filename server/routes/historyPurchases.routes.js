const express = require('express');
const HistoryPurchases = require('../models/HistoryPurchases');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth.middleware');
const chalk = require('chalk');

router.get('/', async (req, res) => {
  try {
    const list = await HistoryPurchases.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const list = await HistoryPurchases.find();
    const hostiryById = list.filter((item) => item.user === id);
    res.status(200).send(hostiryById);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// change
router.patch('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const list = await HistoryPurchases.find();
    const hostiryById = list.filter(
      (item) => JSON.stringify(item.user) === JSON.stringify(id)
    );
    const listId = await HistoryPurchases.findById(hostiryById[0]._id);
    if (JSON.stringify(hostiryById[0].user) === JSON.stringify(req.user._id)) {
      delete list._id;
      const newObject = {
        user: list.user,
        history: req.body,
      };
      await listId.update(newObject);
      res.status(200).send(newObject);
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
