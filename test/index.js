'use strict';

var expect = require('chai').expect;
var mongoose = require('mongoose');
var passwords = require('..');

describe('mongoose-password-bcrypt-nodejs', function() {
  var User, bob;

  beforeEach(function(done) {
    var conn = mongoose.createConnection('mongodb://localhost:27017/test');

    var UserSchema = new mongoose.Schema({
      name: String,
      password: String // required for this module to work
    });
    UserSchema.plugin(passwords);

    User = conn.model('User', UserSchema);

    bob = new User({
      username: 'bob',
      password: 'mfw'
    });
    bob.save(done);
  });

  it('should correctly validate the password', function(done) {
    bob.validPassword('mfw', function(err, res) {
      expect(err).to.be.null;
      expect(res).to.be.true;
      done();
    });
  });

  it('should reject an invalid password', function(done) {
    bob.validPassword('mfw2', function(err, res) {
      expect(err).to.be.null;
      expect(res).to.be.false;
      done();
    });
  });

  it('should correctly validate the password sync', function() {
    expect(bob.validPasswordSync('mfw')).to.be.true;
  });

  it('should reject an invalid password sync', function() {
    expect(bob.validPasswordSync('mfwnot')).to.be.false;
  });

  afterEach(function(done) {
    User.find().remove().exec(done);
  });
});
