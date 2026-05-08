# Guestbook Backend Setup Instructions

## What This Does

This backend server:
- Accepts guestbook submissions from your custom form
- Stores messages persistently in a JSON file
- Provides endpoints for managing messages
- Runs on a free hosting service

## Setup Steps

### 1. **Choose a Hosting Platform (Free Option)**

I recommend **Railway** (easiest) or **Render** (also free). Here's Railway:

#### Railway Setup:
1. Go to https://railway.app
2. Sign up with GitHub (easier)
3. Click "New Project" → "Deploy from GitHub"
4. Select this repository or upload files
5. Railway auto-detects Node.js and installs dependencies
6. Your backend URL will be displayed (something like `https://your-app.railway.app`)
7. Copy this URL

### 2. **Update Your Frontend**

In your `guestbook.html`, find this line:
```javascript
fetch('https://YOUR_BACKEND_URL/submit-guestbook', {
```

Replace `YOUR_BACKEND_URL` with your actual backend URL from Railway (e.g., `https://my-guestbook-backend.railway.app`)

### 3. **Test It**

1. Reload your guestbook page
2. Submit a test message
3. Check if it appears in the custom messages section
4. The backend stores messages permanently

## Alternative: Render (Free Tier)

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo or upload files
4. Set start command: `npm start`
5. Deploy

## Local Testing (Before Deploying)

If you want to test locally first:

```bash
# In the backend folder
npm install
npm start
```

Then update guestbook.html to use `http://localhost:3000` temporarily.

## File Structure

```
neocities-guestbook-backend/
├── package.json          (dependencies)
├── server.js            (main server file)
└── guestbook_messages.json  (auto-created, stores messages)
```

## What Gets Stored

Each message includes:
- Name
- Email (optional)
- Message text
- Color choice
- Timestamp
- Unique message ID

All stored in `guestbook_messages.json`

## Important Notes

- **LocalStorage still works**: Messages display locally for fast loading
- **Permanent storage**: Backend persists messages even after clearing browser cache
- **CORS enabled**: Your Neocities site can communicate with the backend
- **No smartgb.com submission**: This is a custom guestbook. If you want smartgb integration later, that's a more complex step requiring CSRF token handling.

## Next Steps

Let me know once you have:
1. Backend URL deployed
2. Frontend updated with the URL
3. If you need any modifications or run into issues
