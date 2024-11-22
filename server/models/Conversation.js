  import { Schema, model } from 'mongoose';

  const MessageSchema = new Schema({
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
  });

  const ConversationSchema = new Schema({
    user: { type: String, required: true },
    messages: [MessageSchema],
  });

  export default model('Conversation', ConversationSchema);
