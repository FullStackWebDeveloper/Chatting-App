import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmail } from 'validator';


const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const userSchema = new Schema({
  username: { type: 'String', required: true},
  email: { type: 'String', required: true, validate: [ isEmail, 'invalid email' ]},
  password: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  workspace_title: { type: 'String', required: true },
});
userSchema.index({username: 1, workspace_title: 1}, {unique: true});
userSchema.index({email: 1, workspace_title: 1}, {unique: true});

userSchema.pre('save', function(next) {
  var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) {
		return next();
	}
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
      	return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
    	return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model('User', userSchema);
