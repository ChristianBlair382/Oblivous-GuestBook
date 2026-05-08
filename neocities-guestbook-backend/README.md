# Guestbook Backend

A simple Node.js backend for handling custom guestbook submissions that works with your Neocities site.

## Features

✅ Accepts guestbook submissions from your custom form  
✅ Stores messages permanently in JSON  
✅ CORS-enabled for cross-origin requests  
✅ Admin endpoints to view/delete messages  
✅ Lightweight and easy to deploy  

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
npm start
```

Server runs on `http://localhost:3000`

### Test Endpoint
```bash
curl http://localhost:3000/health
```

## Deployment

### Railway (Recommended - Easiest)
1. Push to GitHub
2. Go to railway.app
3. Create new project from GitHub
4. Railway auto-deploys
5. Get your URL from the Railway dashboard

### Render.com
1. Push to GitHub  
2. Go to render.com
3. New Web Service → Connect GitHub
4. Build command: `npm install`
5. Start command: `npm start`

### Heroku (Legacy, but still works)
```bash
heroku create your-app-name
git push heroku main
heroku open
```

## API Endpoints

### POST /submit-guestbook
Submit a new guestbook message

**Request:**
```json
{
  "name": "Your Name",
  "email": "email@example.com",
  "message": "Your message here",
  "color": "red"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message submitted successfully",
  "messageId": 1234567890
}
```

### GET /messages
Retrieve all guestbook messages

**Response:**
```json
{
  "messages": [
    {
      "id": 1234567890,
      "name": "Your Name",
      "email": "email@example.com",
      "message": "Your message here",
      "color": "red",
      "timestamp": "2026-05-07T10:30:00.000Z",
      "ip": "192.168.1.1"
    }
  ]
}
```

### DELETE /messages/:id
Delete a specific message (requires message ID)

## Frontend Integration

Update your guestbook.html:

```javascript
const BACKEND_URL = 'https://your-deployed-url.railway.app';

async function submitMessage() {
  // ... validation code ...
  
  const response = await fetch(`${BACKEND_URL}/submit-guestbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message, color })
  });
  
  // ... handle response ...
}
```

## Environment Variables

Currently none required, but you can add optional configuration:

```
PORT=3000
NODE_ENV=production
```

## Data Storage

Messages are stored in `guestbook_messages.json` in the project root.

For production deployments, consider:
- MongoDB (free tier at mongodb.com)
- PostgreSQL (Railway provides this)
- SQLite

## Troubleshooting

**CORS errors?**
- Backend CORS is already enabled
- Make sure you're using `https://` for deployed URLs (not `http://`)

**404 on /submit-guestbook?**
- Check your backend URL is correct
- Make sure backend is running

**Messages not persisting?**
- On free tier hosting with ephemeral storage (Render free tier), files are deleted when the app stops
- Use a database instead for better persistence

## License

MIT
