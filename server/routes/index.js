const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/firm
router.use('/firm', require('./firm.routes'));
router.use('/product', require('./product.routes'));
router.use('/auth', require('./auth.routes'));
router.use('/user', require('./user.routes'));
router.use('/historyPurchases', require('./historyPurchases.routes'));
router.use('/basket', require('./basket.routes'));
module.exports = router;
