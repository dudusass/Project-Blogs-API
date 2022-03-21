const { User } = require('../models');

const {
  emptyPassword,
  emptyEmail,
  invalidEntries,
  requiredEmail,
  requiredPassword,
} = require('../utils/error');

const getEmail = async (email) => {
  const findEmail = await User.findAll({
    attributes: ['email', 'password'],
    where: { email },
  });

  return findEmail[0];
};

const validatePassword = async (email, password) => {
  if (!password || password === '') throw emptyPassword;

  const { password: passwordDB } = await getEmail(email);

  if (password !== passwordDB) throw emptyPassword;
};

const validateEmail = async (email, password) => {
  if (email === '') throw emptyEmail;

  const findEmail = await getEmail(email);

  if (!findEmail && !password) throw invalidEntries;
};

const verifyLogin = async (email, password) => {
  if (!email && email !== '') throw requiredEmail;
  if (!password && password !== '') throw requiredPassword;

  await validateEmail(email);
  await validatePassword(email, password);
};

module.exports = {
  validatePassword,
  verifyLogin,
};