const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/firm
router.use('/firm', require('./firm.routes'));
router.use('/product', require('./product.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;
