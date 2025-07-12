# 📝 VibeScript - Backend API

VibeScript is a full-featured blogging platform built using the MERN stack. This is the **backend** part of the application, responsible for handling API requests, authentication, blog post management, and user data.

---

## 🔗 Live API Endpoint

- https://cp-blog.onrender.com/api/post
- https://cp-blog.onrender.com/api/user
- https://cp-blog.onrender.com/api/login

---

## ⚙️ Features

- ✅ User Registration & Login (JWT Auth)
- 🛡 Protected Routes using Middleware
- 📝 CRUD Operations for Blog Posts
- 👥 User Profiles
- 🔖 Categories / Tags
- 📅 Timestamps and Sorting
- 🧾 MongoDB with Mongoose Models
- 📦 Scalable File Structure
- 🌐 CORS Configured for Frontend Access

---

## 📁 Folder Structure
```
vibescript-backend/
│

├── models/                # Mongoose models (User, Post, etc.)
│   ├── user.js
│   ├── post.js
│
├── routes/                # Route handlers
│   ├── userRoutes.js
│   ├── postRoutes.js
│
├── controllers/           # Controller logic
│   ├── userController.js
│   ├── postController.js
│
├── middleware/            # Custom middlewares (auth, error handling)
│   └── auth.js
│
├── config/                # DB config
│   └── db.js
│
├── utils/                 # Utility functions
│   └── validate.js
│
├── .env                   
├── .gitignore             
├── app.js / server.js     
├── package.json          
└── README.md              
```
---

## 🧪 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with **Mongoose**)
- **JWT** for secure authentication
- **dotenv** for environment config
- **CORS** for cross-origin support

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Chandrashekher1/vibescript-backend.git
cd vibescript-backend
```
### 2. Install Dependencies

``` bash
npm install
```

### 3. Run the Server
``` bash
node index.js
```
## 🧠 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

## 📄 License
MIT © 2025 Chandrashekher Prasad

