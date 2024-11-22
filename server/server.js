import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Post from './models/Post.js';
import Reply from './models/Reply.js';
import Conversation from './models/Conversation.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const API_KEY = process.env.GENAI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('newPost', (post) => {
    io.emit('receivePost', post);
  });

  socket.on('newReply', (reply) => {
    io.emit('receiveReply', reply);
  });
});

app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ datePosted: -1 });
  res.json(posts);
});

app.post('/replies/:postId', async (req, res) => {
  const reply = new Reply(req.body);
  await reply.save();
  res.json(reply);
});

app.get('/replies/:postId', async (req, res) => {
  const replies = await Reply.find({ postId: req.params.postId });
  res.json(replies);
});

app.delete('/posts/:postId', async (req, res) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.postId);
  await Reply.deleteMany({ postId: req.params.postId });
  res.json(deletedPost);
  io.emit('deletePost', req.params.postId);
});

app.post('/chat', async (req, res) => {
  const { userName, message } = req.body;

  if (!userName || !message) {
    return res.status(400).send({ error: 'User Name and message are required' });
  }

  try {
    let conversation = await Conversation.findOne({ user: userName });
    if (!conversation) {
      conversation = new Conversation({ user: userName, messages: [] });
    }

    conversation.messages.push({ role: 'user', content: message });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyse the user's input and give suggestions or talk with them and provide an answer in paragraphs with spaces between paragraphs and points. Respond as if you are talking to the user in the first person, not the third person:\n\nUser: ${message}\nTherapist:`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    let aiResponse = response.text();

    conversation.messages.push({ role: 'assistant', content: aiResponse });
    await conversation.save();

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Failed to generate response' });
  }
});

app.post('/analyze-quiz', async (req, res) => {
  const { questions, answers } = req.body;

  if (!Array.isArray(questions) || !Array.isArray(answers) || questions.length !== answers.length) {
    return res.status(400).json({ error: 'Invalid input: Questions and answers must be arrays of the same length.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze the following mental health quiz answers and generate a short summary regarding the persons mental health and what can he do, use points and headings and generate answer separated by paragraphs, also give a space between different paragraphs:\n\n${questions.map((q, i) => `${i+1}. ${q} ${answers[i]}`).join('\n')}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = await response.text();
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');

    res.json({ response: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
