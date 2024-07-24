const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Define TestCase schema and model
const testCaseSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  estimateTime: String,
  module: String,
  priority: String
});

const TestCase = mongoose.model('TestCase', testCaseSchema);

// API Endpoints
app.get('/testcases', async (req, res) => {
  const testcases = await TestCase.find();
  res.json(testcases);
});

app.post('/testcases', async (req, res) => {
  const newTestCase = new TestCase(req.body);
  await newTestCase.save();
  io.emit('testcase_added', newTestCase);  // Emit event to update frontend in real-time
  res.json(newTestCase);
});

app.put('/testcases/:id', async (req, res) => {
  const updatedTestCase = await TestCase.findByIdAndUpdate(req.params.id, req.body, { new: true });
  io.emit('testcase_updated', updatedTestCase);  // Emit event to update frontend in real-time
  res.json(updatedTestCase);
});

app.delete('/testcases/:id', async (req, res) => {
  const deletedTestCase = await TestCase.findByIdAndDelete(req.params.id);
  io.emit('testcase_deleted', deletedTestCase);  // Emit event to update frontend in real-time
  res.json(deletedTestCase);
});

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
