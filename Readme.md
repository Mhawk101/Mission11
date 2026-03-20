# 📚 Bookstore App – Setup & Run Instructions

This project is a full-stack web application with:

* **ASP.NET Core Web API (backend)**
* **React + Vite (frontend)**

---

## ⚙️ Prerequisites

Make sure you have installed:

* [.NET SDK (7 or later recommended)](https://dotnet.microsoft.com/)
* [Node.js (v18+ recommended)](https://nodejs.org/)
* A code editor (e.g., Visual Studio / VS Code)

---

## ▶️ Running the Backend (API)

1. Open the backend project in **Visual Studio**
2. Press **F5** or click **Run**

The API should start on:

```
https://localhost:7067
```

Test it in your browser:

```
https://localhost:7067/books
```

---

## ⚛️ Running the Frontend (React)

1. Open a terminal
2. Navigate to the frontend folder:

```
cd bookstore-frontend
```

3. Install dependencies (first time only):

```
npm install
```

4. Start the development server:

```
npm run dev
```

The frontend should start on:

```
http://localhost:5173
```

---

## 🔗 Connecting Frontend to Backend

The React app is configured to call the API at:

```
https://localhost:7067/books
```

If your backend runs on a different port:

* Open `BookList.jsx`
* Update the `fetch` URL accordingly

---

## ⚠️ Notes About Ports

* Ports **may be different on another computer**
* If they change:

  * Check the API launch URL in Visual Studio
  * Check the frontend terminal output for the correct port
* Update the API URL in the frontend if needed

---

## 🚨 Common Issues

**CORS Errors**

* Ensure CORS is enabled in the API (`Program.cs`)

**Fetch Failed / Network Error**

* Make sure both frontend and backend are running

**Wrong Data / No Data**

* Verify the API endpoint `/books` returns data in browser

---

## ✅ Summary

* Backend runs on: `https://localhost:7067`
* Frontend runs on: `http://localhost:5173`
* Run both at the same time for the app to work

---
