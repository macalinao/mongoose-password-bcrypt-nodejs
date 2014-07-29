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

  // Hashes the password upon saving the model
  schema.pre('save', function preSavePassword(next) {
    var model = this;
    if (!model.isModified('password')) {
      return next();
    }

    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  });
};
