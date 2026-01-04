📚 Library Book Management System

A simple full-stack project built for **Naan Mudhalvan Internship Task**.

This project manages library books using  
**Node.js + Express + MongoDB (Backend)** and **HTML / CSS / JS (Frontend)**.

---

## 🚀 Project Features

### 🗄 MongoDB Schema

Fields stored in `books` collection:

| Field | Type |
|------|------|
| title | String |
| author | String |
| category | String |
| publishedYear | Number |
| availableCopies | Number |

Validation rules:

- Required fields
- Copies cannot be negative (error handled)

---

## ⚙️ Backend (Node.js + Express + MongoDB)

Database: `libraryDB`  
Collection: `books`

### 📌 CRUD Operations Implemented

✔ Insert minimum 7 books  
✔ Read all books  
✔ Read books by category  
✔ Read books published after 2015  
✔ Update book copies (+ / −)  
✔ Change book category  
✔ Delete book only if copies = 0  

---

## 🧯 Error Handling Implemented

- Book not found
- Invalid update
- Prevent negative stock quantity
- Do not delete when copies > 0

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|-------|--------|----------|
| GET | `/add-books` | Insert sample 7 books |
| GET | `/books` | Get all books |
| GET | `/books/category/:category` | Filter by category |
| GET | `/books/after2015` | Books published after 2015 |
| PUT | `/update-copies/:id` | Increase / decrease copies |
| PATCH | `/books/category/:id` | Change category |
| DELETE | `/delete-book/:id` | Delete only if copies = 0 |

Backend runs on:
http://localhost:3000
