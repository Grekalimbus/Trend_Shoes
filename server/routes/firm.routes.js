const express = require('express');
const Firm = require('../models/Firm');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const list = await Firm.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// add firm
router.patch('/', async (req, res) => {
  try {
    const id = req.body._id;
    delete req.body._id;
    await Firm.create({ id, ...req.body });
    res.status(200).send(req.body);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

module.exports = router;
