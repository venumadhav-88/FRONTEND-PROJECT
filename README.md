# 🎓 FEDF-PS14: Placement Interaction System

## 📘 Overview
The **Placement Interaction System** is a full-stack web application designed to **manage and track student placement records** efficiently.  
It provides a centralized platform for **students**, **employers**, **placement officers**, and **administrators** to interact, manage job opportunities, and monitor application statuses in real time.

This project is developed under the **FEDF-PS14** module requirement.

---

## 🚀 Features

### 👩‍💻 Admin
- Manage all users (students, employers, officers).
- Control system settings and permissions.
- View and manage all job postings and placement data.
- Generate summary reports for placements and applications.

### 🎓 Student
- Explore job opportunities posted by employers.
- Apply for jobs and track application statuses.
- Update personal and academic profile.
- Receive notifications on selection updates.

### 🏢 Employer
- Create and manage company profile.
- Post new job openings with details like role, package, and eligibility.
- Review student applications.
- Update application statuses (Under Review, Shortlisted, Selected, Rejected).

### 🎯 Placement Officer
- Track placement records and generate reports.
- Monitor student-employer interactions.
- Assist in resolving placement queries.

---

## 🏗️ Tech Stack

| Layer | Technology Used |
|-------|------------------|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT (JSON Web Token) |
| **Routing** | React Router v6 |
| **API Calls** | Axios |

---

## 📂 Project Structure
FEDF/
├── client/ # Frontend (Vite + React)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
├── server/ # Backend (Node + Express)
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── config/
│ ├── middleware/
│ └── index.js
│
├── README.md
└── package.json

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites
Ensure the following are installed:
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)


