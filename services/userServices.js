const { User } = require('../models');

const {
  emailExists,
  invalidEmail,
  requiredEmail,
  requiredPassword,
  invalidPassword,
  invalidDisplayName,
  userNotFound,
} = require('../utils/error');

const validateEmail = async (email) => {
  if (!email) throw requiredEmail;
  const emailRegex = /^[a-z0-9\-_]+@[a-z]+\.[a-z]{2,}$/;
  if (emailRegex.test(email) === false) throw invalidEmail;

  const ifEmailExists = await User.findAll({
    attributes: ['email'],
    where: {
      email: `${email}`,
    },
  });

  if (ifEmailExists.length >= 1) throw emailExists;
};

const verifyUser = (displayName, password) => {
  if (!password) throw requiredPassword;
  if (password.length < 6) throw invalidPassword;
  if (displayName.length <= 7) throw invalidDisplayName;
};

const findById = async (id) => {
  const getUserById = await User.findOne({
    attributes: { exclude: ['updatedAt', 'createdAt'] },
    where: {
      id,
    },
  });

  if (!getUserById) throw userNotFound;
  return getUserById;
};

module.exports = {
  validateEmail,
  verifyUser,
  findById,
};