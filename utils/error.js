// status code for token

const tokenNotFound = { status: 401, message: 'Token not found' };
const tokenInvalid = { status: 401, message: 'Expired or invalid token' };

module.exports = {
  tokenNotFound,
  tokenInvalid,
};