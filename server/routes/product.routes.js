const express = require('express');
const Product = require('../models/Product');
const router = express.Router({ mergeParams: true });

// getAllProduct / accepted
router.get('/', async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// changeAllProduct
router.put('/', async (req, res) => {
  try {
    await createInitialEntity(Product, req.body);
    res.status(200).send(req.body);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    Object.keys(data).map(async (item, index) => {
      try {
        delete data[item]._id;
        const newItem = new Model(data[item]);
        await newItem.save();
        return item;
      } catch (e) {
        return e;
      }
    })
  );
}

// getIdProduct / accepted
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Product.findById(id);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// addProduct / accepted
router.patch('/', async (req, res) => {
  try {
    delete req.body._id;
    await Product.create(req.body);
    res.status(200).send(req.body);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
      e,
    });
  }
});

// changeProductId / accepted
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    delete req.body._id;
    await Product.findById(id).update(req.body);
    res.status(200).send(req.body);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

// changeQuantity / accepted
router.patch('/:id/quantity', async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Product.findById(id);
    const newProduct = {
      firm: list.firm,
      imgProduct: list.imgProduct,
      name: list.name,
      price: list.price,
      quantity: req.body,
    };
    await Product.findById(id).update(newProduct);
    res.status(200).send(req.body);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
      e,
    });
  }
});

// getQuantity
router.get('/:id/quantity', async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Product.findById(id);
    res.status(200).send(list.quantity);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
      e,
    });
  }
});

// removeProduct
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findById(id).remove();
    res.status(200).send(req.body);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
      e,
    });
  }
});

// getFirm / accepted
router.get('/:id/firm', async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Product.findById(id);
    const firm = list.firm;
    res.status(200).send(firm);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка, попробуйте позже',
    });
  }
});

module.exports = router;
