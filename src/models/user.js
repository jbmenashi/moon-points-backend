import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username: String,
   bio: String,
   points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point' }],
});

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};


userSchema.pre('remove', function(next) {
  this.model('Point').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);

export default User;