import mongoose from 'mongoose';

import User from './user';
import Point from './point';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Point };

export { connectDb };

export default models;