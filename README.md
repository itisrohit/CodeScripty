# CodeScripty

**Building something cool with the MERN stack!**

---

## 🚀 Project Overview

CodeScripty is an online IDE built to provide developers with a seamless and feature-rich coding environment. While still in progress, this project aims to enable users to write, execute, and manage code directly in their browser.

---

## 🛤️ Development Progress

- **Current Progress:**

  - Backend: Core API routes for file management, user authentication, and code execution are under development.
  - Frontend: Basic UI with Monaco Editor and initial Redux state management is functional.

- **Upcoming Features:**

  - Integration with Razorpay for payment processing
  - Improved UI/UX for project and file management

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/itisrohit/CodeScripty/issues) for open topics.

---

## 🛠️ Technology Stack

This project leverages the MERN stack:

### Frontend:

- **React.js**
- **Vite** for fast development and build tooling
- **TailwindCSS** for responsive and modern UI

### Backend:

- **Node.js** with **Express.js** for RESTful APIs
- **MongoDB** as the database
- **Passport.js** for authentication
- **Piston API** for code execution
- **Razorpay API** for payment processing (upcoming)

---

## 📂 Directory Structure

```plaintext
codescripty/
├── README.md
├── backend/
│   ├── package.json
│   ├── public/
│   │   └── temp/
│   │       └── .gitkeep
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── config/
│       │   ├── db.js
│       │   └── passport.js
│       ├── controllers/
│       │   ├── file.controller.js
│       │   ├── folder.controller.js
│       │   ├── piston.controller.js
│       │   ├── razorpay.controller.js
│       │   └── user.controller.js
│       ├── middlewares/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── file.model.js
│       │   ├── folder.model.js
│       │   ├── order.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── file.routes.js
│       │   ├── folder.routes.js
│       │   ├── piston.routes.js
│       │   ├── razorpay.routes.js
│       │   └── user.routes.js
│       └── utils/
│           ├── asyncHandler.js
│           ├── piston.js
│           └── razorpay.js
└── frontend/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── .gitignore
    ├── public/
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── assets/
        ├── components/
        │   ├── MonacoEditor.jsx
        │   └── Demo/
        │       ├── BodyContent.jsx
        │       └── NavBar.jsx
        ├── hooks/
        │   └── useCodeExecution.jsx
        ├── pages/
        │   ├── Demo.jsx
        │   ├── Error.jsx
        │   ├── Home.jsx
        │   └── LanguageIDE.jsx
        └── redux/
            ├── store.jsx
            └── slices/
                ├── codeExecutionSlice.jsx
                └── languageSlice.jsx
```

---

## ⚙️ Installation and Setup

### Prerequisites:

- **Node.js** and **npm** installed
- **MongoDB** running locally or in the cloud

### Steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/itisrohit/CodeScripty.git
   ```

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables for the backend:

   - Create a `.env` file in the `backend` directory with the following:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     ACCESS_TOKEN_SECRET=your_access_token_secret
     ACCESS_TOKEN_EXPIRY=your_access_token_expiry
     REFRESH_TOKEN_SECRET=your_refresh_token_secret
     REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry
     CLIENT_URL=your_client_url
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     GOOGLE_CALLBACK_URL=your_google_callback_url
     SESSION_SECRET=your_session_secret
     GITHUB_CLIENT_ID=your_github_client_id
     GITHUB_CLIENT_SECRET=your_github_client_secret
     GITHUB_CALLBACK_URL=your_github_callback_url
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     ```

4. Start the backend server:

   ```bash
   npm start
   ```

5. Navigate to the frontend directory and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

6. Start the frontend development server:

   ```bash
   npm run dev
   ```

7. Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgements

- [Piston API](https://github.com/engineer-man/piston) for powering the code execution.
- [Razorpay](https://razorpay.com/) for seamless payment integration.
- The open-source community for providing amazing tools and resources.

---

## 📧 Contact

For questions or feedback, reach out to:

- **Author:** Rohit Kumar
- **GitHub:** [itisrohit](https://github.com/itisrohit/)

