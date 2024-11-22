import { Schema, model } from 'mongoose';

const replySchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  content: String,
  datePosted: { type: Date, default: Date.now },
  user: String,
});

export default model('Reply', replySchema);