import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: String,
    content: String,
    datePosted: { type: Date, default: Date.now },
    user: String,
});

postSchema.virtual('dateOnly').get(function() {
    return this.datePosted.toISOString().split('T')[0];
});

postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

export default model('Post' , postSchema)