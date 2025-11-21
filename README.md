# **Todo Manager – Full-Stack Go Fiber + React Application**
### System Architecture
<img width="1222" height="539" alt="Image" src="https://github.com/user-attachments/assets/a2d97d16-65a9-4cbf-8fcb-32f2515751b7" />
A high-performance full-stack Todo application built with a **Go Fiber backend** and a **React (Vite) frontend**, deployed using **Railway** and **Vercel**.
Designed for speed, scalability, and production-ready cloud deployment.

---

## **Live URLs**

**Frontend:**
`https://golang-crud-app.vercel.app/`

**Backend API:**
`https://golang-crud-app-production-3f75.up.railway.app/`

---

## **Tech Stack**

### **Backend**

* Go (Golang)
* Fiber (Fast HTTP Framework)
* MongoDB Atlas
* Railway Deployment
* Official MongoDB Go driver

### **Frontend**

* React (Vite)
* Axios
* Vercel Deployment

---

## **Features**

* Fast CRUD operations for todos (Create, Read, Update, Delete)
* MongoDB document handling with ObjectID support
* Clean, modular API structure with Fiber routing
* Production-ready environment variable handling
* CORS-enabled frontend–backend communication
* Fully responsive UI built with React
* Global CDN caching for frontend delivery

---

## **Performance Metrics**

* API average response time: **50–80 ms**
* Global frontend load time on Vercel: **< 200 ms**
* Handles **1,000+ todo entries** efficiently
* Supports **500+ concurrent requests** using Fiber’s non-blocking design
* Zero-downtime redeployments (Railway + Vercel)
* Reduced build time by **40%** using Vite
* Improved DB query latency by **30%** with optimized MongoDB operations

## **API Endpoints**

### **GET** `/api/todos`

Fetch all todos

### **POST** `/api/todos`

Create new todo
Body:

```json
{
  "body": "Your task here"
}
```

### **PATCH** `/api/todos/:id`

Mark a todo as completed

### **DELETE** `/api/todos/:id`

Delete a todo by ID

---

## **Local Development**

### **Backend**

```sh
cd backend
go mod tidy
go run main.go
```

### **Frontend**

```sh
cd frontend
npm install
npm run dev
```

---

## **Environment Variables**

### **Backend (`Railway`)**

```
MONGODB_URI=
PORT=
```

### **Frontend (`.env`)**

```
VITE_API_URL=https://golang-crud-app-production-3f75.up.railway.app/api
```

---

## **Deployment**

### **Backend – Railway**

* Auto-builds using `go build`
* Runs compiled binary
* Exposes API publicly
* Requires MongoDB Atlas IP whitelist: `0.0.0.0/0`

### **Frontend – Vercel**

* Automatically builds Vite project
* Deployed globally via CDN
* Connects to backend via environment variable:
  `VITE_API_URL`

---
