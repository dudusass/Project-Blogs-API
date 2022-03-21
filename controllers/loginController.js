const express = require('express');

const auth = require('../auth/auth');

const { verifyLogin } = require('../services/loginServices');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    await verifyLogin(email, password);

    const token = auth.genToken(email);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;