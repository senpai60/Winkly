# Winkly - A Modern Dating Experience

Winkly is a full-stack dating application project that introduces a unique concept of NFT-based virtual dates and rewards. It features a mobile app for the core experience, a landing page, and a robust backend. This project is built with a modern tech stack including React, Node.js, Express, and MongoDB.

## ✨ Features

* **Swipe & Match:** A familiar and intuitive swiping interface for liking or disliking profiles.
* **NFT-Based Dating:** A unique system where users can purchase a "Date NFT" to initiate a week-long, feature-rich virtual dating experience.
* **Interactive Experiences:** Engage in fun activities, chats, and surprises throughout your date week.
* **Rating & Rewards:** At the end of the date, both participants rate the experience. Successful interactions can convert NFTs into rewards.
* **Profile Management:** Users can create, update, and manage their profiles with photos, interests, and more.
* **Secure Authentication:** The application uses JWT for secure user authentication.

## 💻 Tech Stack

This project is a monorepo containing three main parts:

* **`application`**: A mobile application built with React, Vite, and shadcn/ui.
* **`client`**: A landing page built with React, Vite, and GSAP for animations.
* **`server`**: A backend API built with Node.js, Express, and MongoDB.

### Frontend (application & client)

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [GSAP (for client animations)](https://greensock.com/gsap/)
* [shadcn/ui (for application components)](https://ui.shadcn.com/)

### Backend (server)

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
* [JWT](https://jwt.io/) for authentication
* [Cloudinary](https://cloudinary.com/) for image storage

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm installed
* MongoDB instance (local or cloud)
* A Cloudinary account for image uploads

### Installation & Setup

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your-username/winkly.git](https://github.com/your-username/winkly.git)
    cd winkly
    ```

2.  **Setup the Server**
    * Navigate to the `server` directory: `cd server`
    * Install NPM packages: `npm install`
    * Create a `.env` file and add your configuration (MongoDB URI, JWT secret, Cloudinary credentials).
    * Start the server: `npm run dev`

3.  **Setup the Client (Landing Page)**
    * Navigate to the `client` directory: `cd ../client`
    * Install NPM packages: `npm install`
    * Start the client: `npm run dev`

4.  **Setup the Application (Mobile App)**
    * Navigate to the `application` directory: `cd ../application`
    * Install NPM packages: `npm install`
    * Create a `.env` file with your backend API URL.
    * Start the application: `npm run dev`

## 👨‍💻 Author

* **Vivek Satloniya**

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
