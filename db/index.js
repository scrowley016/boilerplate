const client = require('./client');

module.exports = {
  client,
};

//below would not work

// module.exports = {
//   ...require('./client'),
//   ...require('.users'),
//   ...require('./make'),
// };
