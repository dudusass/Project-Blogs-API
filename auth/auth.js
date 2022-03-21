require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
  tokenNotFound,
  tokenInvalid,
} = require('../utils/error');

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, process.env.JWT_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  if (!token) throw tokenNotFound;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data } = decoded;
    if (!data) throw tokenInvalid;

    return data;
  } catch (error) {
    throw tokenInvalid;
  }
};

module.exports = {
  genToken,
  verifyToken,
}; 