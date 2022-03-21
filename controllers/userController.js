const express = require('express');
const auth = require('../auth/auth');

const router = express.Router();

const { User } = require('../models');
const { verifyUser, validateEmail } = require('../services/userServices.js');

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    verifyUser(displayName, password);
    await validateEmail(email);

    await User.create({ displayName, email, password, image });
    const token = auth.genToken(email);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;