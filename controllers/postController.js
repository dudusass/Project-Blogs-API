const express = require('express');
const auth = require('../auth/auth');

const router = express.Router();

const { BlogPost, User, Category } = require('../models');
const { verifyUser, verifyCategories, verifyPost } = require('../services/postServices');

router.post('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const email = auth.verifyToken(authorization);
    const findUser = await User.findOne({ where: { email } });

    const { id } = findUser;
    await verifyUser(id, email);
    const { title, content, categoryIds } = req.body;
    await verifyCategories(categoryIds);
    verifyPost(title, content, findUser);
    const time = new Date();
    const createPost = await 
    BlogPost.create({ title, content, userId: id, published: time, updated: time });
    return res.status(201).json(createPost);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    await auth.verifyToken(authorization);
    const findBlogPost = await BlogPost.findAll({
      include: [
        { 
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return res.status(200).json(findBlogPost);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;