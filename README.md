# 🧠 BrainStack Backend

[![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

**BrainStack Backend** is the powerful API engine behind the BrainStack "Second Brain" ecosystem. It handles secure authentication, content persistence, and dynamic content sharing using a robust MongoDB integration.

---

## ✨ Key Features

- 🔐 **Secure Authentication**: JWT-based stateless authentication with password hashing.
- 💾 **Content Persistence**: Scalable storage for links, notes, and metadata via MongoDB.
- 🔗 **Dynamic Share System**: Generate and manage unique sharable hashes for public access.
- 🛠️ **Developer Friendly**: Built entirely with TypeScript for type-safety and better developer experience.
- 🚀 **Performant Middleware**: Custom authentication and error-handling middleware.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (Version 5+)
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Security**: JSON Web Tokens (JWT), CORS, Dotenv for config.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd brainstack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_uri
   JWT_PASSWORD=your_secure_secret
   ```

4. **Run in Development**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔌 API Documentation

### Auth Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/signup` | Create a new account |
| `POST` | `/api/v1/signin` | Login and receive JWT token |

### Content Endpoints (Auth Required)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/content` | Save a new link/note |
| `GET` | `/api/v1/content` | Fetch all saved content |
| `DELETE` | `/api/v1/content` | Remove a content item |

### Brain Sharing
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/brain/share` | Toggle sharable status |
| `GET` | `/api/v1/brain/:shareLink` | View shared content publicly |

---

## 📂 Project Structure

```text
brainstack/
├── src/
│   ├── index.ts       # Server entry & Route handlers
│   ├── db.ts          # Mongoose Models (User, Content, Link)
│   ├── middleware.ts  # Auth verification middleware
│   └── utils.ts       # Utility functions (Random hash generator)
├── dist/              # Compiled JavaScript
├── tsconfig.json      # TypeScript configuration
└── .env               # Environment configuration
```

---

## 🌐 Frontend
This backend powers the [BrainStack UI](https://github.com/devansh-chouhan/BrainStack-UI).

---
<p align="center">Built with 💪 by Devansh Chouhan</p>

