const express = require('express');
const auth = require('../auth/auth');

const router = express.Router();

const { User } = require('../models');
const { verifyUser, validateEmail, findById } = require('../services/userServices.js');

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

router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    await auth.verifyToken(authorization);

    const users = await User.findAll({
      attributes: { exclude: ['updatedAt', 'createdAt'] },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { authorization } = req.headers;
    await auth.verifyToken(authorization);

    const { id } = req.params;
    const getUserByid = await findById(id);

    return res.status(200).json(getUserByid);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;