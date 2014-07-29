var bcrypt = require('bcrypt-nodejs');

module.exports = function(schema, options) {
  /**
   * Checks if a password is valid.
   *
   * @param password - The password to check
   * @param cb(err, res) - The callback, where `res` is a boolean.
   */
  schema.methods.validPassword = function(password, cb) {
    return bcrypt.compare(password, this.password, cb);
  };

  /**
   * Synchronously checks if a password is valid.
   *
   * @param password The password to check
   */
  schema.methods.validPasswordSync = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
};
