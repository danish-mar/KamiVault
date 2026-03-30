<div align="center">

<br/>

```
██╗  ██╗ █████╗ ███╗   ███╗██╗██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗
██║ ██╔╝██╔══██╗████╗ ████║██║██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝
█████╔╝ ███████║██╔████╔██║██║██║   ██║███████║██║   ██║██║     ██║   
██╔═██╗ ██╔══██║██║╚██╔╝██║██║╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║   
██║  ██╗██║  ██║██║ ╚═╝ ██║██║ ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║   
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   
```

<h3>🏛️ AI-Powered Government Document Intelligence Platform</h3>

<p>
  <strong>Secure · Intelligent · Real-time</strong><br/>
  Neural OCR extraction meets military-grade document security
</p>

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![MinIO](https://img.shields.io/badge/MinIO-C72E49?style=for-the-badge&logo=minio&logoColor=white)](https://min.io/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)](https://python.org/)

<br/>

[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-purple?style=flat-square)](package.json)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)]()
[![2FA](https://img.shields.io/badge/Security-2FA_Protected-orange?style=flat-square)]()

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [🎯 Problem Statement](#-problem-statement)
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#-system-architecture)
- [🔄 Application Flow](#-application-flow)
- [🔐 Security Flow](#-security-flow)
- [📂 Document Processing Pipeline](#-document-processing-pipeline)
- [🗂️ Project Structure](#-project-structure)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🔌 API Reference](#-api-reference)
- [🛡️ Security Model](#-security-model)
- [📊 Data Models](#-data-models)
- [🌐 Socket Events](#-socket-events)
- [🐳 Docker Deployment](#-docker-deployment)
- [🗺️ Roadmap](#-roadmap)

---

## 🌟 Overview

**KamiVault** is a next-generation, AI-powered government document management system designed to digitize, classify, verify, and securely store official documents such as Aadhaar Cards, PAN Cards, Voter IDs, and Driving Licenses.

It combines **Gemini 2.0 Flash neural intelligence** with **enterprise-grade MinIO object storage**, **Two-Factor Authentication**, and **real-time WebSocket updates** — delivering an end-to-end secure document intelligence platform.

> Built for **Smart India Hackathon** under problem statements **SG1** (AI-Powered Government Document Management) and **SG2** (Intelligent Document Digitization & Classification).

---

## 🎯 Problem Statement

```
┌─────────────────────────────────────────────────────────────────────┐
│  SG1 — AI-Powered Government Document Management System             │
│  ─────────────────────────────────────────────────────────────────  │
│  Build a secure digital platform for storage, verification and      │
│  controlled access of official government documents.                │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  SG2 — Intelligent Document Digitization & Classification           │
│  ─────────────────────────────────────────────────────────────────  │
│  Develop an AI system that converts physical records into           │
│  structured digital formats using OCR and auto-classification.      │
└─────────────────────────────────────────────────────────────────────┘
```

### 🧩 Pain Points Addressed

| Problem | KamiVault Solution |
|---|---|
| Physical document loss | Secure encrypted cloud vault |
| Manual data entry errors | AI-powered auto-extraction via Gemini 2.0 Flash |
| Unauthorized document access | Mandatory 2FA + session-based auth |
| Slow verification processes | Instant structured data extraction |
| Unstructured document formats | Neural classification into typed schemas |
| No real-time processing feedback | WebSocket live status updates |

---

## ✨ Key Features

### 🤖 AI Intelligence Layer
- **Neural OCR Extraction** — Gemini 2.0 Flash extracts Name, ID Number, DOB, Gender, Father Name
- **Auto Document Classification** — Identifies Aadhaar, PAN, Voter ID, Driving License automatically
- **Structured JSON Output** — Every document becomes a typed, queryable data object
- **Smart Thumbnail Generation** — Visual previews generated on upload

### 🔐 Security Architecture
- **Two-Factor Authentication (TOTP)** — Google Authenticator / Authy compatible
- **Mandatory 2FA for Vault Access** — No bypass possible without verification
- **Session-Based Auth** — Secure `httpOnly`, `SameSite` cookies
- **JWT Tokens** — Stateless API authentication with 2FA claims
- **Private MinIO Buckets** — User-isolated object storage with presigned URLs

### 🔴 Real-Time Experience
- **Socket.io Live Updates** — Processing status pushed to client instantly
- **No Page Refresh Required** — Metadata auto-populates as AI finishes
- **Processing Indicators** — Animated status dots (pending → processing → processed)

### 🗃️ Document Management
- **Upload PDF & Images** — 10MB limit, type-validated
- **Full CRUD Operations** — Create, preview, edit metadata, delete
- **Tag & Category System** — Organize by Personal, Finance, Medical, Work, Legal
- **Full-Text Search** — Search across title, type, category in real-time
- **Presigned Download URLs** — Secure, time-limited download links (24h)

---

## 🏗️ System Architecture

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                         KAMIVAULT SYSTEM ARCHITECTURE                        ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   ┌─────────────────────────────────────────────────────────────────────┐   ║
║   │                        CLIENT LAYER                                  │   ║
║   │   ┌───────────────┐   ┌───────────────┐   ┌───────────────────────┐ │   ║
║   │   │  EJS Views    │   │  Tailwind CSS │   │   Socket.io Client    │ │   ║
║   │   │  (SSR)        │   │  (Styling)    │   │   (Real-time)         │ │   ║
║   │   └───────┬───────┘   └───────────────┘   └──────────┬────────────┘ │   ║
║   └───────────┼─────────────────────────────────────────┼──────────────┘   ║
║               │ HTTP/HTTPS                               │ WebSocket         ║
║   ┌───────────▼─────────────────────────────────────────▼──────────────┐   ║
║   │                     APPLICATION LAYER (Node.js / Express 5)         │   ║
║   │                                                                      │   ║
║   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   ║
║   │  │ AuthController│  │DocController │  │ItemController│              │   ║
║   │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │   ║
║   │         │                 │                  │                       │   ║
║   │  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐              │   ║
║   │  │  AuthService │  │  DocService  │  │  ItemService │              │   ║
║   │  │  (JWT+TOTP)  │  │  (MinIO)     │  │  (MongoDB)   │              │   ║
║   │  └──────────────┘  └──────┬───────┘  └──────────────┘              │   ║
║   │                           │                                          │   ║
║   │               ┌───────────▼───────────┐                             │   ║
║   │               │    SocketService       │                             │   ║
║   │               │  (Real-time updates)   │                             │   ║
║   │               └───────────────────────┘                             │   ║
║   └──────────────────────────────────────────────────────────────────────┘   ║
║                         │                  │                                  ║
║          ┌──────────────▼──┐    ┌──────────▼──────────┐                     ║
║          │   MongoDB        │    │   MinIO              │                     ║
║          │  (Metadata +     │    │  (Binary Files +     │                     ║
║          │   User Data)     │    │   Object Storage)    │                     ║
║          └──────────────────┘    └──────────────────────┘                     ║
║                                            │                                  ║
║                               ┌────────────▼───────────┐                     ║
║                               │  Python FastAPI Service  │                     ║
║                               │  (Gemini 2.0 Flash AI)  │                     ║
║                               │  Port: 8001              │                     ║
║                               └────────────────────────┘                     ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 🔄 Application Flow

### User Journey — End to End

```
                              KAMIVAULT USER FLOW
                              ═══════════════════

  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │  SIGNUP  │───▶│  LOGIN   │───▶│  2FA     │───▶│  VAULT   │───▶│  UPLOAD  │
  │          │    │  (Email+ │    │  VERIFY  │    │  DASH-   │    │  DOC     │
  │ Register │    │  Pass)   │    │  (TOTP)  │    │  BOARD   │    │          │
  └──────────┘    └──────────┘    └──────────┘    └──────────┘    └────┬─────┘
                                                                        │
                              ┌─────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────────────────────────┐
              │                 UPLOAD PIPELINE                     │
              │                                                     │
              │   File ──▶ Multer ──▶ /tmp ──▶ MinIO Storage       │
              │              │                       │              │
              │              └──▶ MongoDB Record ◀───┘              │
              │                      │                              │
              │                      ▼                              │
              │              FastAPI (Python)                       │
              │              Gemini 2.0 Flash                       │
              │                      │                              │
              │              ┌───────▼────────┐                     │
              │              │  Classification │                     │
              │              │  + Extraction   │                     │
              │              └───────┬────────┘                     │
              │                      │                              │
              │              ┌───────▼────────┐                     │
              │              │  Socket.io      │                     │
              │              │  PUSH to client │                     │
              │              └───────┬────────┘                     │
              │                      │                              │
              │              ┌───────▼────────┐                     │
              │              │  UI Auto-fills  │                     │
              │              │  Metadata Form  │                     │
              │              └────────────────┘                     │
              └───────────────────────────────────────────────────┘

              SEARCH ──▶ FILTER ──▶ PREVIEW ──▶ DOWNLOAD ──▶ DELETE
```

---

## 🔐 Security Flow

### Authentication & 2FA State Machine

```
                        AUTHENTICATION STATE MACHINE
                        ════════════════════════════

  ┌───────────┐
  │   START   │
  └─────┬─────┘
        │
        ▼
  ┌─────────────────────────────────────┐
  │  POST /api/auth/login               │
  │  { email, password }                │
  └──────────────┬──────────────────────┘
                 │
        ┌────────▼────────┐
        │  Credentials    │
        │  Valid?         │
        └───┬────────┬────┘
            │ NO     │ YES
            ▼        ▼
        ┌───────┐  ┌────────────────────────────────────────┐
        │ 401   │  │  is2FAEnabled?                          │
        │ Error │  └────────────────┬───────────────────────┘
        └───────┘                   │
                          ┌────────▼────────┐
                          │   YES    │   NO  │
                          ▼          ▼       │
                    ┌──────────┐  ┌──────────▼────────────┐
                    │ Return:  │  │  Set Session:           │
                    │ requires │  │  userId, userName       │
                    │ 2FA:true │  │  twoFactorVerified:false│
                    └────┬─────┘  └───────────────────────┘
                         │
              ┌──────────▼──────────┐
              │  Set tempUserId in  │
              │  session            │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │  POST /2fa/auth     │
              │  { token: "123456" }│
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │  TOTP Valid?        │
              └───┬──────────┬──────┘
                  │ NO       │ YES
                  ▼          ▼
               ┌──────┐  ┌────────────────────────────┐
               │ 400  │  │  Set session:               │
               │ Error│  │  userId, twoFactorVerified: │
               └──────┘  │  true                       │
                         └─────────────┬───────────────┘
                                       │
                              ┌────────▼────────┐
                              │  ✅ /vault        │
                              │  ACCESS GRANTED  │
                              └─────────────────┘

  ───────────────────────────────────────────────────────────────────
  VAULT ACCESS CHECK (authMiddleware):
  
  Request ──▶ Has JWT?                    Has Session?
                │ YES                          │ YES
                ▼                              ▼
           Decode JWT                  Check session.userId
           twoFactorVerified?          Check twoFactorVerified
                │ NO                          │ NO
                ▼                              ▼
           403 Forbidden              Redirect /setup-2fa or /verify-2fa
```

---

## 📂 Document Processing Pipeline

### AI Extraction Flow

```
  ┌────────────────────────────────────────────────────────────────────┐
  │                  DOCUMENT PROCESSING PIPELINE                       │
  └────────────────────────────────────────────────────────────────────┘

   CLIENT                   NODE.JS                  PYTHON             GEMINI
     │                        │                         │                  │
     │──── POST /upload ──────▶│                         │                  │
     │                        │──── Multer saves ──────▶│                  │
     │                        │       to /tmp            │                  │
     │                        │                         │                  │
     │                        │──── Upload to MinIO ───▶│                  │
     │                        │                         │                  │
     │                        │──── Save MongoDB ──────▶│                  │
     │                        │    status: PENDING       │                  │
     │◀─── 201 (doc created) ─│                         │                  │
     │                        │                         │                  │
     │                        │──── POST /process ─────▶│                  │
     │                        │    (FormData + file)     │                  │
     │                        │                         │──── Gemini ──────▶│
     │                        │    Update: PROCESSING    │    Flash API      │
     │                        │                         │◀─── Response ─────│
     │                        │                         │                  │
     │                        │◀─── Structured JSON ────│                  │
     │                        │                         │                  │
     │                        │──── Update MongoDB ────▶│                  │
     │                        │    status: PROCESSED     │                  │
     │                        │    title, category,      │                  │
     │                        │    tags, metadata        │                  │
     │                        │                         │                  │
     │◀── socket: docUpdate ──│                         │                  │
     │    (Real-time push)     │                         │                  │
     │                        │                         │                  │
     │  Auto-fill form        │                         │                  │
     │  ✅ Display card        │                         │                  │


  ──────────────────────────────────────────────────────────────────────
  DOCUMENT TYPE CLASSIFICATION MATRIX:

  Input Doc ──▶ Gemini Analysis
                     │
         ┌───────────┴──────────────────────────────┐
         │           │               │               │
         ▼           ▼               ▼               ▼
      AADHAAR       PAN           VOTER_ID          DL
     ─────────    ──────────     ──────────────    ──────
     aadhaar_no   pan_no         epic_no           dl_no
     name         name           name              name
     dob          dob            dob               dob
     gender       father_name    gender            gender
                                 father_name       father_name

  All types also extract: title, category, description, tags[], doc_type
```

---

## 🗂️ Project Structure

```
kamivault/
│
├── 📁 src/                          # TypeScript source code
│   ├── 📄 server.ts                 # Entry point — MongoDB + HTTP + Socket init
│   ├── 📄 app.ts                    # Express app, middleware, routing
│   │
│   ├── 📁 controllers/              # Request handlers (thin layer)
│   │   ├── 📄 AuthController.ts     # Login, signup, 2FA setup/verify/authenticate
│   │   ├── 📄 DocumentController.ts # Upload, download, list, delete, preview
│   │   └── 📄 ItemController.ts     # Home render, items API
│   │
│   ├── 📁 services/                 # Business logic layer
│   │   ├── 📄 AuthService.ts        # JWT, TOTP, bcrypt password hashing
│   │   ├── 📄 DocumentService.ts    # MinIO I/O, AI notification, DB CRUD
│   │   ├── 📄 StorageService.ts     # MinIO client, bucket management
│   │   ├── 📄 SocketService.ts      # Socket.io server, room management
│   │   └── 📄 ItemService.ts        # Item queries
│   │
│   ├── 📁 models/                   # Mongoose schemas
│   │   ├── 📄 User.ts               # User + bcrypt hooks + comparePassword
│   │   ├── 📄 Document.ts           # Document + status enum + structured data
│   │   └── 📄 Item.ts               # Demo item model
│   │
│   ├── 📁 routes/                   # Express routers
│   │   ├── 📄 authRoutes.ts         # /api/auth/*
│   │   ├── 📄 documentRoutes.ts     # /api/documents/* + multer middleware
│   │   └── 📄 itemRoutes.ts         # /api/items/*
│   │
│   └── 📁 middlewares/
│       └── 📄 AuthMiddleware.ts     # JWT + session auth + 2FA enforcement
│
├── 📁 views/                        # EJS templates
│   ├── 📄 layout.ejs                # Base HTML, Tailwind CDN, global styles
│   ├── 📄 index.ejs                 # Landing page
│   ├── 📄 login.ejs                 # Sign in form
│   ├── 📄 signup.ejs                # Registration form
│   ├── 📄 vault.ejs                 # Main document management dashboard
│   ├── 📄 settings.ejs              # User settings
│   ├── 📄 2fa-setup.ejs             # QR code + TOTP setup
│   ├── 📄 2fa-verify.ejs            # 2FA verification screen
│   └── 📁 partials/
│       ├── 📄 header.ejs            # Sticky nav with auth state
│       ├── 📄 footer.ejs            # Footer with status indicator
│       └── 📄 card.ejs              # Reusable item card
│
├── 📁 public/
│   └── 📁 css/
│       └── 📄 style.css             # Global styles (glassmorphism variant)
│
├── 📁 dist/                         # Compiled JS output (tsc)
│
├── 📄 docker-compose.yml            # MongoDB + MinIO containers
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 package.json                  # Dependencies + scripts
└── 📄 .env.example                  # Environment variable template
```

---

## 💻 Tech Stack

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          KAMIVAULT TECH STACK                               │
└────────────────────────────────────────────────────────────────────────────┘

  FRONTEND                BACKEND                  AI / ML
  ─────────────           ─────────────────────    ─────────────────────────
  EJS (SSR)               Node.js v20+             Gemini 2.0 Flash (Google)
  Tailwind CSS (CDN)      Express 5.x              FastAPI (Python)
  Socket.io Client        TypeScript 6.x           OCR + NLP Extraction
  Vanilla JS              express-session          Structured JSON Output
                          express-ejs-layouts

  STORAGE                 AUTH / SECURITY          DEVOPS / INFRA
  ─────────────────       ─────────────────────    ─────────────────────────
  MongoDB 4.4             bcryptjs (pw hash)       Docker + Docker Compose
  Mongoose 9.x            jsonwebtoken (JWT)       nodemon (dev watch)
  MinIO (S3-compat)       otplib (TOTP/2FA)        ts-node (dev runtime)
  Multer (file upload)    qrcode (QR generation)   tsc (production build)
```

### Dependency Map

```
  ┌─────────────────────────────────────────────────────────────┐
  │                   CORE DEPENDENCY GRAPH                      │
  │                                                             │
  │  express ──────────┬──── cors                              │
  │                    ├──── express-session                   │
  │                    ├──── express-ejs-layouts               │
  │                    └──── multer                            │
  │                                                             │
  │  mongoose ─────────┬──── mongodb                           │
  │                    └──── bson                              │
  │                                                             │
  │  minio ────────────┬──── stream-json                       │
  │                    └──── fast-xml-parser                   │
  │                                                             │
  │  jsonwebtoken ─────┬──── jws                               │
  │                    └──── jwa                               │
  │                                                             │
  │  otplib ───────────┬──── @otplib/core                      │
  │                    ├──── @otplib/plugin-crypto             │
  │                    └──── @otplib/preset-default            │
  │                                                             │
  │  socket.io ────────┬──── engine.io                         │
  │                    └──── socket.io-adapter                 │
  │                                                             │
  │  axios ─────────────────── (Python AI service calls)       │
  └─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 20.19.0
npm >= 8.x
docker + docker-compose
python >= 3.10 (for AI service)
```

### 1. Clone the Repository

```bash
git clone https://github.com/danish-mar/KamiVault.git
cd KamiVault
```

### 2. Configure Environment

```bash
cp .env.example .env
```

```env
# .env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/kamivault

# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=password123
MINIO_BUCKET=vault-assets

# JWT Secret (change in production!)
JWT_SECRET=your-super-secret-key-here
```

### 3. Start Infrastructure (Docker)

```bash
# Start MongoDB + MinIO
docker-compose up -d

# Verify containers are running
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE              STATUS         PORTS
xxxxxxxxxxxx   mongo:4.4          Up 2 minutes   0.0.0.0:27017->27017/tcp
xxxxxxxxxxxx   minio/minio        Up 2 minutes   0.0.0.0:9000->9000/tcp, 0.0.0.0:9001->9001/tcp
```

### 4. Install Dependencies & Run

```bash
# Install packages
npm install

# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm start
```

### 5. Start the AI Processing Service

```bash
cd python-service/    # Your FastAPI service
pip install -r requirements.txt
uvicorn main:app --port 8001
```

### Access Points

| Service | URL |
|---|---|
| 🌐 KamiVault App | http://localhost:3000 |
| 🗄️ MongoDB | mongodb://localhost:27017 |
| 📦 MinIO Console | http://localhost:9001 |
| 🤖 AI Service | http://localhost:8001 |

---

## 🔌 API Reference

### Auth Endpoints

```
POST   /api/auth/signup              Register new user
POST   /api/auth/login               Login with email + password
GET    /api/auth/logout              Destroy session
GET    /api/auth/me                  Get current session user
GET    /api/auth/2fa/setup           Generate TOTP secret + QR code
POST   /api/auth/2fa/verify-setup    Verify TOTP and enable 2FA
POST   /api/auth/2fa/authenticate    Authenticate using TOTP token
```

### Document Endpoints (🔒 Auth Required)

```
POST   /api/documents/upload         Upload PDF or image (multipart/form-data)
GET    /api/documents/list           Get all documents for current user
GET    /api/documents/:id            Get single document
GET    /api/documents/:id/download   Get presigned download URL (24h)
DELETE /api/documents/:id            Delete document + MinIO object
PATCH  /api/documents/:id/metadata   Update title, tags, category
POST   /api/documents/webhook        Receive AI processing results
```

### Item Endpoints (🔒 Auth Required)

```
GET    /api/items                    Get all items
GET    /api/items/recent?count=3     Get N most recent items
```

### View Routes

```
GET    /                             Landing page
GET    /login                        Sign in
GET    /signup                       Registration
GET    /vault                 🔒2FA   Document dashboard
GET    /setup-2fa             🔒      TOTP QR setup
GET    /verify-2fa            🔒      TOTP verification
GET    /settings              🔒      User settings
GET    /logout                       Session destroy + redirect
```

---

## 🛡️ Security Model

```
┌────────────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                                 │
│                                                                    │
│  Layer 1 — Password Security                                       │
│  ─────────────────────────────                                     │
│  bcryptjs (10 salt rounds) — Passwords never stored in plaintext   │
│                                                                    │
│  Layer 2 — Session Security                                        │
│  ─────────────────────────────                                     │
│  httpOnly cookies (no JS access)                                   │
│  SameSite: lax (CSRF protection)                                   │
│  secure: true in production (HTTPS only)                           │
│                                                                    │
│  Layer 3 — JWT Tokens                                              │
│  ─────────────────────────────                                     │
│  1-day expiry tokens                                               │
│  twoFactorVerified claim embedded                                  │
│  HMAC-SHA256 signed                                                │
│                                                                    │
│  Layer 4 — Two-Factor Auth (TOTP)                                  │
│  ─────────────────────────────────                                 │
│  RFC 6238 compliant TOTP                                           │
│  30-second rotating codes                                          │
│  Compatible: Google Auth, Authy, 1Password                         │
│  Mandatory for vault access — no bypass                            │
│                                                                    │
│  Layer 5 — Object Storage Isolation                                │
│  ──────────────────────────────────                                │
│  User-scoped paths: {userId}/{timestamp}-{filename}                │
│  Presigned URLs with 24-hour expiry                                │
│  No direct public bucket access                                    │
│                                                                    │
│  Layer 6 — Input Validation                                        │
│  ─────────────────────────────                                     │
│  Multer: file type whitelist (.pdf, .png, .jpg, .jpeg)             │
│  10MB upload size limit                                            │
│  Mongoose schema validation on all writes                          │
└────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Models

### User Schema

```typescript
{
  email:            String   // Unique, lowercase, trimmed
  password:         String   // bcrypt hashed (10 rounds)
  name:             String   // Display name
  twoFactorSecret:  String?  // TOTP base32 secret
  is2FAEnabled:     Boolean  // Default: false
  createdAt:        Date     // Auto-generated
}
```

### Document Schema

```typescript
{
  userId:           ObjectId           // Ref → User
  originalName:     String             // Original filename
  mimeType:         String             // application/pdf | image/*
  size:             Number             // Bytes
  minioObjectName:  String             // {userId}/{ts}-{name}
  status:           Enum               // pending | processing | processed | error
  title:            String?            // AI-generated or user-set
  tags:             String[]           // e.g. ['aadhaar', 'identity']
  category:         String?            // Personal | Finance | Work | Medical
  description:      String?            // AI summary sentence
  thumbnailUrl:     String?            // base64 JPEG preview
  structuredData:   Mixed              // Full AI JSON response
  error:            String?            // Error message if status=error
  createdAt:        Date               // Auto (timestamps:true)
  updatedAt:        Date               // Auto (timestamps:true)
}
```

### Structured AI Output Schema

```json
{
  "title": "Aadhaar Card - John Doe",
  "category": "Identity",
  "description": "Government-issued biometric identity document.",
  "tags": ["aadhaar", "identity", "government"],
  "doc_type": "aadhaar | pan | voter_id | dl | generic",
  "metadata": {
    "name": "John Doe",
    "id_number": "XXXX XXXX 1234",
    "dob": "01/01/1990",
    "gender": "Male",
    "father_name": "James Doe",
    "aadhaar_no": "XXXX XXXX 1234",
    "pan_no": "",
    "epic_no": "",
    "dl_no": ""
  }
}
```

---

## 🌐 Socket Events

### Event Flow

```
  CLIENT                                              SERVER
    │                                                   │
    │──── emit('join', documentId) ────────────────────▶│
    │                                                   │── socket.join(room)
    │                                                   │
    │                               [AI Processing Done]│
    │                                                   │── io.to(docId).emit(...)
    │◀─── on('documentUpdate', data) ───────────────────│
    │                                                   │
    │  data = {                                         │
    │    status: 'processed' | 'error',                 │
    │    document: { title, category, tags, ... }       │
    │  }                                                │
```

### Client Usage

```javascript
const socket = io();

// Subscribe to document updates
socket.emit('join', documentId);

// Handle real-time AI results
socket.on('documentUpdate', (data) => {
  if (data.status === 'processed') {
    document.getElementById('metaTitle').value = data.document.title;
    document.getElementById('metaCategory').value = data.document.category;
    // Auto-populate form fields
  }
});
```

---

## 🐳 Docker Deployment

### `docker-compose.yml` Services

```yaml
services:
  mongodb:
    image: mongo:4.4
    ports: ["27017:27017"]
    volumes: [mongodb_data:/data/db]

  minio:
    image: minio/minio:latest
    ports: ["9000:9000", "9001:9001"]
    environment:
      MINIO_ROOT_USER: admin
      MINIO_ROOT_PASSWORD: password123
    command: server /data --console-address ":9001"
    volumes: [minio_data:/data]
```

### Production Deployment Checklist

```
□ Set JWT_SECRET to cryptographically random 64-char string
□ Enable HTTPS and set cookie.secure = true
□ Set MinIO credentials to strong values
□ Configure CORS origin for production domain
□ Set NODE_ENV=production
□ Enable MongoDB authentication
□ Configure MinIO TLS certificates
□ Set up reverse proxy (nginx/caddy)
□ Configure log aggregation
□ Set up backup policies for MongoDB + MinIO volumes
```

---

## 🗺️ Roadmap

```
COMPLETED ✅                     IN PROGRESS 🔄            PLANNED 📋
────────────────────────────     ─────────────────────     ────────────────────────────────
✅ User Auth (JWT + Session)     🔄 PDF preview iframe     📋 Admin dashboard
✅ TOTP 2FA enforcement          🔄 Batch upload UI        📋 Document sharing (links)
✅ MinIO object storage          🔄 Python AI polish       📋 End-to-end encryption
✅ AI document classification                              📋 Mobile app (React Native)
✅ Gemini metadata extraction                              📋 Aadhaar offline verification
✅ Real-time Socket.io updates                             📋 DigiLocker integration
✅ Full CRUD document ops                                  📋 Face verification layer
✅ Search + filter vault                                   📋 Audit log + access trail
✅ Thumbnail generation                                    📋 Multi-language OCR
✅ Indian ID card templates                                📋 ABHA health ID support
✅ Docker Compose infrastructure                           📋 Federated identity login
```

---

## 🧠 What Makes KamiVault Unique

```
┌─────────────────────────────────────────────────────────────────────┐
│                         UNIQUENESS FACTORS                           │
│                                                                     │
│  🎯 India-First Design                                              │
│     Specialized AI prompts for Aadhaar, PAN, Voter ID, DL          │
│     Beautiful card-style renderers for each document type           │
│                                                                     │
│  ⚡ Non-Blocking AI Pipeline                                        │
│     Document upload returns instantly (201 Created)                 │
│     AI runs async in background, results pushed via WebSocket       │
│     Zero waiting for the user — seamless UX                         │
│                                                                     │
│  🔐 Zero-Compromise Security                                        │
│     2FA is not optional — vault is completely inaccessible          │
│     without TOTP verification, even with valid credentials          │
│                                                                     │
│  🖼️ Visual Document Cards                                           │
│     Each document type renders its own unique card template         │
│     (Aadhaar blue, PAN green, Voter ID amber, DL gray)              │
│                                                                     │
│  🔍 Smart Search with Live Filtering                                │
│     Filter by doc type (aadhaar, pan) AND free-text title           │
│     Counts update dynamically as you type                           │
│                                                                     │
│  📱 Apple-Inspired Design System                                    │
│     Glassmorphism + SF Pro–like typography                          │
│     Smooth micro-animations and translucent navbars                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 👥 Team & Contributing

```
KamiVault was built for Smart India Hackathon 2025
Problem Statements: SG1 + SG2

Contributors welcome! Please:
  1. Fork the repository
  2. Create a feature branch (git checkout -b feature/amazing-feature)
  3. Commit your changes (git commit -m 'feat: add amazing feature')
  4. Push to the branch (git push origin feature/amazing-feature)
  5. Open a Pull Request
```

---

## 📄 License

```
ISC License

Copyright (c) 2026 KamiVault

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

<div align="center">

<br/>

```
Built with ♥ for Bharat | Secure Documents, Intelligent India
```

[![GitHub](https://img.shields.io/badge/GitHub-KamiVault-181717?style=for-the-badge&logo=github)](https://github.com/danish-mar/KamiVault)

</div>
