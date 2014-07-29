module.exports = function(schema, options) {
  /**
   * Synchronously checks if a password is valid.
   *
   * @param password The password to check
   */
  schema.methods.validPasswordSync = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
};
