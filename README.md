# CodeScripty

CodeScripty is an online Integrated Development Environment (IDE) that supports multiple programming languages. It allows users to write, execute, and manage code directly from their browser. The project is built with a modern tech stack including React, Redux, Express, and MongoDB.

## Features

- **Multi-language Support**: Write and execute code in various programming languages.
- **User Authentication**: Supports Google and GitHub OAuth for user authentication.
- **File and Folder Management**: Create, update, and manage files and folders.
- **Code Execution**: Execute code and get real-time output.
- **Premium Access**: Users can upgrade to premium for additional features.

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: Passport.js (Google and GitHub OAuth)
- **Payment Integration**: Razorpay

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Razorpay account for payment integration

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/codescripty.git
    cd codescripty
    ```

2. Install backend dependencies:
    ```sh
    cd backend
    npm install
    ```

3. Install frontend dependencies:
    ```sh
    cd ../frontend
    npm install
    ```

### Environment Variables

Create a `.env` file in the [backend](http://_vscodecontentref_/0) directory and add the following environment variables:


### Running the Application

1. Start the backend server:
    ```sh
    cd backend
    npm run dev
    ```

2. Start the frontend development server:
    ```sh
    cd ../frontend
    npm run dev
    ```

3. Open your browser and navigate to [http://localhost:3000](http://_vscodecontentref_/1).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.