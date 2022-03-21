const express = require('express');
const auth = require('../auth/auth');

const router = express.Router();

const { Category } = require('../models');
const { requiredName } = require('../utils/error');

router.post('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    await auth.verifyToken(authorization);

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: requiredName.message });
    const postCategory = await Category.create({ name });
    const { dataValues } = await postCategory;
    return res.status(201).json(dataValues);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;