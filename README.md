# 🏔️ Venue AI Concierge

An intelligent corporate event venue suggestion platform powered by AI (Llama / GPT-4). Describe your event in plain English and receive instant, structured, and personalized venue recommendations.

---

## ✨ Features

* 🤖 **AI-Powered Recommendations**
  Uses LLMs (Llama / GPT-4) to interpret natural language and generate structured proposals.

* 🎯 **Instant Venue Proposals**
  Get detailed suggestions including pricing, amenities, and capacity.

* 📝 **Natural Language Input**
  Describe events conversationally without rigid formats.

* 💾 **Search History Persistence**
  Stores all user queries and responses in the database.

* 🎨 **Modern UI/UX**
  Clean dark theme with amber accents and smooth animations.

* 📱 **Responsive Design**
  Fully optimized for both desktop and mobile devices.

---

## 🏗️ Architecture

```
Frontend (React + Vite + TailwindCSS)
        ↓
Backend (Node.js + Express)
        ↓
Database (MongoDB Atlas)
        ↓
AI Provider (SambaNova Llama API / OpenAI)
```

---

## 📋 Prerequisites

* Node.js (v18 or higher)
* MongoDB Atlas account (Free Tier)
* SambaNova API Key or OpenAI API Key
* Git

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Manshi-Singh547075/Louder
cd Louder
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

---

### 3. Backend Setup

```bash
cd backend
npm install
```

---

### 4. Environment Configuration

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/venue_db

# AI Provider (SambaNova recommended)
SAMBA_API_KEY=your_sambanova_api_key
SAMBA_MODEL=Llama-4-Maverick-17B-128E-Instruct

# Optional: OpenAI
# OPENAI_API_KEY=sk-your-openai-key

PORT=3001
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3001
```

---

### 5. Run the Application

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm run dev
```

Visit: **http://localhost:5173**

---

## 💡 Example Event Descriptions

```text
"10-person leadership retreat in the Himalayas for 3 days, $8k budget"

"50-person sales kickoff in Mumbai with team-building activities, $30k budget"

"Intimate 6-person board strategy offsite in Goa, beachside, 2 days"
```

---

## 📦 Sample API Response

```json
{
  "id": "67f5d3a1b2c3d4e5f6a7b8c9",
  "userQuery": "Need a 25-person corporate retreat in the mountains for 3 days",
  "proposal": {
    "venueName": "Alpine Peak Retreat Center",
    "location": "Aspen, Colorado, USA",
    "estimatedCost": "$12,500 - $15,000 total",
    "whyItFits": "This venue perfectly matches your corporate retreat requirements...",
    "amenities": ["Conference rooms", "Team-building course", "Spa facilities"],
    "capacity": "20-30 guests",
    "eventType": "Corporate Retreat"
  },
  "metadata": {
    "attendees": "25",
    "duration": "3 days",
    "budget": "$12,500 - $15,000"
  },
  "createdAt": "2026-03-21T19:35:05.000Z"
}
```

---

## 🌍 Production Environment Variables

### Backend

```env
MONGODB_URI=your_production_mongodb_uri
SAMBA_API_KEY=your_sambanova_key
FRONTEND_URL=https://your-frontend-url.com
PORT=10000
NODE_ENV=production
```

### Frontend

```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🛠️ Tech Stack

### Frontend

* React 18
* Vite
* TailwindCSS
* Lucide React
* clsx

### Backend

* Node.js
* Express
* MongoDB + Mongoose
* OpenAI SDK
* CORS

### AI Providers

* SambaNova (Llama models)
* OpenAI (GPT-4)
* OpenRouter

---

## 📁 Project Structure

```
venue-ai-concierge/
├── backend/
│   ├── models/
│   │   └── EventSearch.js
│   ├── routes/
│   │   ├── suggest.js
│   │   └── history.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.jsx
│   │   │   ├── ProposalCard.jsx
│   │   │   └── LoadingState.jsx
│   │   ├── hooks/
│   │   │   └── UseEventSearch.js
│   │   ├── lib/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---


## 👩‍💻 Author

**Manshi Singh**
Full Stack Developer | AI Enthusiast

---

## ⭐ Final Note

This project turns vague human intent into structured, decision-ready outputs. Think of it as a translator between *“We need a chill offsite”* and *“Here’s your perfect venue with cost, capacity, and rationale.”*

If this were a product, it wouldn’t just suggest venues. It would quietly remove hours of planning chaos.

---
