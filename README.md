# Two-Dashboard AI Feedback System

A modern web-based feedback system with AI-powered responses, analytics, and dual dashboards.

## 🌟 Features

### User Dashboard
- ⭐ Interactive star rating (1-5 stars)
- 📝 Review submission form
- 🤖 Instant AI-generated personalized responses
- 🎨 Premium glassmorphism UI with animations

### Admin Dashboard
- 📊 Real-time analytics (total reviews, average rating, sentiment distribution)
- 📋 Live feedback monitoring
- 🔍 Search and filter capabilities
- 🔄 Auto-refresh functionality
- 🎯 AI-generated summaries and recommended actions
- 🔒 Password-protected access

### Backend API
- 🚀 Express.js REST API
- 🧠 OpenAI GPT-3.5-turbo integration
- 💾 JSON file-based data storage
- 🔐 Admin authentication

## 📁 Project Structure

```
DashBoard/
├── backend/
│   ├── server.js              # Express server
│   ├── routes/
│   │   ├── feedback.js        # Feedback submission endpoints
│   │   └── admin.js           # Admin data endpoints
│   ├── services/
│   │   └── ai.js              # AI/LLM integration
│   ├── data/
│   │   └── feedback.json      # Data storage
│   ├── package.json
│   └── .env.example
├── user-dashboard/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── admin-dashboard/
    ├── index.html
    ├── styles.css
    └── script.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your credentials:
   # OPENAI_API_KEY=your_openai_api_key_here
   # ADMIN_PASSWORD=your_admin_password
   # PORT=3000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:3000`

### User Dashboard Setup

1. **Open `user-dashboard/script.js`** and update the API URL if needed:
   ```javascript
   const API_URL = 'http://localhost:3000';
   ```

2. **Open `user-dashboard/index.html`** in a browser or use a local server:
   ```bash
   # Using Python
   cd user-dashboard
   python -m http.server 8080
   
   # Or use VS Code Live Server extension
   ```

3. **Access at:** `http://localhost:8080`

### Admin Dashboard Setup

1. **Open `admin-dashboard/script.js`** and update the API URL if needed:
   ```javascript
   const API_URL = 'http://localhost:3000';
   ```

2. **Open `admin-dashboard/index.html`** in a browser or use a local server:
   ```bash
   cd admin-dashboard
   python -m http.server 8081
   ```

3. **Access at:** `http://localhost:8081`
4. **Login** with the password you set in `.env` (default: `admin123`)

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a new Web Service** on [Render](https://render.com)
2. **Connect your GitHub repository**
3. **Configure:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables:
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `ADMIN_PASSWORD`: Your admin password
     - `PORT`: 3000

4. **Deploy** and note your backend URL (e.g., `https://your-app.onrender.com`)

### User Dashboard Deployment (Vercel)

1. **Update API URL** in `user-dashboard/script.js`:
   ```javascript
   const API_URL = 'https://your-backend.onrender.com';
   ```

2. **Deploy to Vercel:**
   ```bash
   cd user-dashboard
   npx vercel
   ```

3. **Follow prompts** and deploy

### Admin Dashboard Deployment (Vercel)

1. **Update API URL** in `admin-dashboard/script.js`:
   ```javascript
   const API_URL = 'https://your-backend.onrender.com';
   ```

2. **Deploy to Vercel:**
   ```bash
   cd admin-dashboard
   npx vercel
   ```

## 🔌 API Endpoints

### Public Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /api/feedback` - Submit feedback
  ```json
  {
    "rating": 5,
    "review": "Great service!"
  }
  ```

### Admin Endpoints (Require `X-Admin-Password` header)

- `GET /api/admin/feedback` - Get all feedback
- `GET /api/admin/analytics` - Get analytics data

## 🎨 Design Features

- **Glassmorphism effects** with backdrop blur
- **Gradient backgrounds** and smooth animations
- **Responsive design** for mobile and desktop
- **Interactive star ratings** with hover effects
- **Color-coded sentiment** indicators
- **Modern typography** using Inter font

## 🤖 AI Features

1. **User Response Generation**: Personalized thank-you messages based on rating and review content
2. **Review Summarization**: Concise AI-generated summaries of feedback
3. **Recommended Actions**: Context-aware suggestions for business follow-up

## 🔒 Security Notes

- Admin dashboard uses simple password authentication
- For production, consider implementing:
  - JWT tokens
  - OAuth 2.0
  - Rate limiting
  - HTTPS enforcement

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `ADMIN_PASSWORD` | Password for admin dashboard | Yes |
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, OpenAI API
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Styling**: Custom CSS with glassmorphism
- **Fonts**: Google Fonts (Inter)
- **Deployment**: Render (backend), Vercel (frontend)

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Support

For issues or questions, please check the console logs for debugging information.
