const client = require('./client');
const users = require('./users');

module.exports = {
  client,
  ...users,
};

//below would not work

// module.exports = {
//   ...require('./client'),
//   ...require('.users'),
//   ...require('./make'),
// };
