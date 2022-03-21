// status code for token

const tokenNotFound = { status: 401, message: 'Token not found' };
const tokenInvalid = { status: 401, message: 'Expired or invalid token' };

// status code for email

const emailExists = { status: 409, message: 'User already registered' };

const invalidEmail = { status: 400, message: '"email" must be a valid email' };

const requiredEmail = { status: 400, message: '"email" is required' };

const emptyEmail = { status: 400, message: '"email" is not allowed to be empty' };

// status code for password

const requiredPassword = { status: 400, message: '"password" is required' };

const emptyPassword = { status: 400, message: '"password" is not allowed to be empty' };

const invalidPassword = {
  status: 400,
  message: '"password" length must be 6 characters long',
};

// status code for user

const invalidDisplayName = {
  status: 400,
  message: '"displayName" length must be at least 8 characters long',
};

const userNotFound = { status: 404, message: 'User does not exist' };
const invalidEntries = { status: 400, message: 'Invalid fields' };

module.exports = {
  tokenNotFound,
  tokenInvalid,
  emailExists,
  invalidEmail,
  requiredEmail,
  emptyEmail,
  requiredPassword,
  emptyPassword,
  invalidPassword,
  invalidDisplayName,
  userNotFound,
  invalidEntries,
};