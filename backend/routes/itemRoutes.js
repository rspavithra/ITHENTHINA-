const express = require('express');
const items = require('../data/items');

const router = express.Router();

// @route   GET /api/items
// @desc    Get all available everyday objects for invention generation
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    total: items.length,
    items
  });
});

module.exports = router;
