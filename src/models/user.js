import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      unique: true,
   },
   bio: {
      type: String,
      required: true
   }
});

userSchema.pre('remove', function(next) {
  this.model('Point').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);

export default User;