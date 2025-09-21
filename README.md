# 📊 Personal Finance Dashboard  

A **full-stack personal finance web app** that lets you track income, expenses, and balances in a simple, modern interface.  
Built with **React (Vite, Material-UI)** for the frontend and **Java (Spring Boot, Maven)** for the backend.  

---

## ✨ Features  
- ✅ **Live Backend Connection** – Health check and data fetching via REST API.  
- 💸 **Transactions List** – Add, delete, and clear transactions with one click.  
- 🧾 **Summary Card** – Displays total balance, income, and expenses in real time.  
- 🎨 **Responsive UI** – Clean, mobile-friendly layout using Material-UI components.  
- 🚀 **Fast Build Tools** – Vite for frontend dev server and Maven for backend builds.  

---

## 🛠️ Tech Stack  
| Layer       | Technology                           |  
|--------------|------------------------------------|  
| **Frontend** | React 18, Vite, Material-UI         |  
| **Backend**  | Java 11, Spring Boot 2.7, Maven     |  
| **Language** | JavaScript (frontend), Java (backend) |  

---

## 📂 Project Structure  
```
personal-finance-dashboard/
│
├── backend/          # Spring Boot backend (API + health endpoint)
└── frontend/         # React + Vite + Material-UI frontend
```

---

## ▶️ Running Locally  

### Prerequisites  
- **Java 11+** and **Maven** installed  
- **Node.js 18+** and **npm** installed  

### Backend  
```bash
cd backend
mvn spring-boot:run
```
Visit: [http://localhost:8080/api/health](http://localhost:8080/api/health)

### Frontend  
```bash
cd frontend
npm install
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

---

## 🌟 Future Improvements  
- Persistent storage with a real database (e.g., AWS RDS PostgreSQL).  
- Authentication for multiple users.  
- Budget categories and monthly reports.  

---

## 🤝 Contributing  
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.  
