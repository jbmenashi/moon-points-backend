import mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
   day: String,
   pic: String,
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Point = mongoose.model('Point', pointSchema);

export default Point;