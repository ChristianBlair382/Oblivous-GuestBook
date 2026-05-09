const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Data file for storing messages
const DATA_FILE = path.join(__dirname, 'guestbook_messages.json');

// Initialize data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// Load messages from file
async function loadMessages() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
}

// Save messages to file
async function saveMessages(messages) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Error saving messages:', error);
    throw error;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Submit guestbook message
app.post('/submit-guestbook', async (req, res) => {
  try {
    const { name, email, message, color } = req.body;

    // Validate input
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    // Create message object
    const newMessage = {
      id: Date.now(),
      name: name || 'Anonymous',
      email: email || '',
      message: message.trim(),
      color: color || 'red',
      timestamp: new Date().toISOString(),
      ip: req.ip // Optional: for moderation purposes
    };

    // Load existing messages
    const messages = await loadMessages();

    // Add new message
    messages.push(newMessage);

    // Save to file
    await saveMessages(messages);

    console.log(`New message from ${newMessage.name}: ${newMessage.message.substring(0, 50)}...`);

    // Return success
    res.json({ 
      success: true, 
      message: 'Message submitted successfully',
      messageId: newMessage.id
    });

  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error while submitting message' 
    });
  }
});

// Get all messages (optional endpoint for admin)
app.get('/messages', async (req, res) => {
  try {
    const messages = await loadMessages();
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: 'Error loading messages' });
  }
});

// Delete message (requires email match or admin password)
app.delete('/messages/:id', async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email or admin password required' 
      });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const isAdmin = adminPassword && email === adminPassword;

    let messages = await loadMessages();
    const messageToDelete = messages.find(msg => msg.id === messageId);

    if (!messageToDelete) {
      return res.status(404).json({ 
        success: false, 
        error: 'Message not found' 
      });
    }

    // Check if user is admin or message owner
    const isOwner = email === messageToDelete.email;
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ 
        success: false, 
        error: 'Unauthorized: Email does not match message owner' 
      });
    }

    // Delete the message
    messages = messages.filter(msg => msg.id !== messageId);
    await saveMessages(messages);

    console.log(`Message ${messageId} deleted by ${isAdmin ? 'admin' : 'owner'}`);

    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Error deleting message' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
initializeDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Guestbook backend running on port ${PORT}`);
  });
});
