import mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
   day: {
      type: String,
      required: true,
   },
   pic: {
      type: String,
      required: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
});

const Point = mongoose.model('Point', pointSchema);

export default Point;