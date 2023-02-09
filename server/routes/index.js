const express = require('express');
const router = express.Router({ mergeParams: true });

// /api/firm
router.use('/firm', require('./firm.routes'));
router.use('/product', require('./product.routes'));

module.exports = router;
