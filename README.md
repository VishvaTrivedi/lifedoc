# 🏥 LifeDoc: The AI-Powered Family Health Guardian

![NEXT.JS](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white) ![EXPRESS](https://img.shields.io/badge/Express-5.0-green?style=for-the-badge&logo=express&logoColor=white) ![MONGODB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb&logoColor=white) ![GEMINI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-blue?style=for-the-badge&logo=google&logoColor=white)

<!-- LLM-OPTIMIZED-SUMMARY-START -->
> **Project Name:** LifeDoc
> **Hackathon:** Hack The Winter: The Second Wave (Angry Bird Edition)
> **Track:** Health & Wellness
> **Version:** 1.0 (Prototype)
> **Key Tech Stack:** Next.js 16, Express, MongoDB, Google Gemini 1.5 Flash, GPT-4o Vision, Redux Toolkit.
> **Unique Selling Point (USP):** Active AI Health Guardian for Families with specialized Prescription Digitization.
<!-- LLM-OPTIMIZED-SUMMARY-END -->

![LifeDoc Banner](https://via.placeholder.com/1200x350?text=LifeDoc+Health+Guardian+System)

## 📋 Executive Summary
**Problem:** Healthcare data is fragmented and unintelligible to patients. Families lack a centralized system to proactively monitor the health of elderly members.
**Solution:** LifeDoc is an AI-first platform that centralizes records, translates medical jargon into plain English using Gemini AI, and provides real-time risk analysis for family guardians.

---

## 🏗️ System Architecture

The following diagram illustrates how LifeDoc processes data from user input to AI analysis and storage.

```mermaid
graph TD
    User((User))
    Frontend[Client (Next.js 16)]
    Backend[Server (Express.js)]
    DB[(MongoDB Atlas)]
    AI_Gemini[Google Gemini 1.5]
    AI_Vision[GPT-4o Vision]

    User -->|Interacts| Frontend
    Frontend -->|API Requests| Backend
    Backend -->|Auth/Data| DB
    Backend -->|Text Analysis| AI_Gemini
    Backend -->|Image Processing| AI_Vision
    AI_Gemini -->|Analysis Result| Backend
    AI_Vision -->|Digitized Rx| Backend
    Backend -->|Response| Frontend
```

---

## 🌟 Key Features & Workflows

### 1. 🗣️ AI Speak & Voice Interaction
> *"Technology should adapt to people, not the other way around."*
*   **Workflow**:
    1.  User taps microphone button.
    2.  User speaks: *"I have a severe headache since morning."*
    3.  App converts voice to text -> Sends to AI -> Analyzes urgency.
    4.  App **speaks back** actionable advice: *"Please rest in a dark room and monitor your BP. If it persists, see a doctor."*

### 2. 💊 Smart Prescription Lens (Digitization)
*   **Workflow**:
    1.  User enters `Rx Scanner`.
    2.  Takes photo of paper prescription.
    3.  **GPT-4o Vision** extracts medication names, dosages, and timings.
    4.  System creates a **Medicine Schedule** added to the user's daily reminders.

### 3. 🛡️ Family Health Dashboard
*   **Workflow**:
    1.  User adds a family member (e.g., "Grandpa") via email invite.
    2.  Grandpa logs a high BP reading (160/100).
    3.  **Guardian Alert**: User immediately receives a notification about Grandpa's risk status.
    4.  AI suggests contacting a doctor immediately.

---

## 📁 Project Structure

A detailed look at the codebase organization.

```
LifeDoc/
├── client/                     # Frontend Application (Next.js 16)
│   ├── src/
│   │   ├── app/                # App Router (Pages & Layouts)
│   │   │   ├── consultation/   # AI Chat Feature
│   │   │   ├── measurements/   # Vitals Tracking
│   │   │   ├── profile/        # User Settings
│   │   │   └── globals.css     # Global Styles (No Scrollbars)
│   │   ├── components/         # Reusable UI
│   │   │   ├── Sidebar.tsx     # Main Navigation
│   │   │   └── ...
│   │   ├── store/              # Redux Toolkit Slices
│   │   │   ├── authSlice.ts    # User Session
│   │   │   └── ...
│   │   └── services/           # Axios Config
│   └── ...
│
├── server/                     # Backend API (Express.js)
│   ├── routes/                 # API Endpoints
│   │   ├── ai.js               # Gemini Integration
│   │   ├── auth.js             # JWT Handling
│   │   └── consultation.js     # History Management
│   ├── models/                 # Mongoose Schemas (User, Consultation)
│   ├── controllers/            # Business Logic
│   └── middleware/             # Auth Protection
│
└── README.md                   # This Documentation
```

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | **Next.js 16** (App Router), **Redux Toolkit** (State), **Tailwind CSS v4** (Styling) |
| **Backend** | **Node.js**, **Express.js v5**, **JWT** (Secure Auth) |
| **Database** | **MongoDB Atlas** (Mongoose ODM) |
| **AI Models** | **Google Gemini 1.5 Flash** (Text/Analysis), **GPT-4o** (Vision) |
| **Tools** | **Mermaid.js** (Diagrams), **Axios** (HTTP) |

---

## ⚙️ How to Run Locally

<details>
<summary><strong>Click to expand Setup Instructions</strong></summary>

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/LifeDoc.git
cd LifeDoc
```

### 2. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following keys:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt
# AI Providers
GEMINI_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key_for_vision
# Image Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the Development Server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the `client` directory and install dependencies:
```bash
cd client
npm install
```

Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the Frontend Application:
```bash
npm run dev
# Application runs on http://localhost:3000
```

</details>

---

## 🔌 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user & get token |
| `POST` | `/api/ai/analyze` | Send symptoms to Gemini for analysis |
| `GET` | `/api/measurements` | Fetch vitals history |
| `POST` | `/api/measurements` | Log new glucose/BP/weight |

---

## 👥 The Team
*   **Mohit Soni**: AI Integration & Backend Architecture
*   **Arya Patel**: Frontend UI/UX & State Management
*   **Ishita Trivedi**: Database Design & Documentation
*   **Visha Trivedi**: Database Design & Documentation

---
*Built with ❤️ for generic health & wellness.*
