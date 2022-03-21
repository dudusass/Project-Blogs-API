const { Category, User } = require('../models');

const {
  userNotFound,
  titleRequired,
  contentRequired,
  categoryIdsRequired,
  categoryIdNotFound,
  invalidUser,
} = require('../utils/error');

const verifyUser = async (id) => {
  const findPost = await User.findOne({ where: { id } });
  if (!findPost) throw invalidUser;
};

const verifyCategories = async (categoryIds) => {
  if (!categoryIds) throw categoryIdsRequired;
  const allCategories = await Category.findOne({ where: { id: categoryIds } });
  if (!allCategories) throw categoryIdNotFound;
};

const verifyPost = (title, content, findUser) => {
  if (!findUser) throw userNotFound;
  if (!title) throw titleRequired;
  if (!content) throw contentRequired;
};

module.exports = {
  verifyUser,
  verifyCategories,
  verifyPost,
};