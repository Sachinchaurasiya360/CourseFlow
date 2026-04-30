# CourseFlow

A comprehensive course management system built with modern web technologies, featuring user authentication, role-based access control, and course administration capabilities.

## Features

- **User Authentication**: Secure login and signup with JWT tokens
- **Role-Based Access**: Separate dashboards for Students and Admins
- **Course Management**: Create, update, and manage courses
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Email Integration**: Email services for notifications and verification
- **Database Integration**: MongoDB for data persistence
- **Logging**: Comprehensive logging with Pino

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Pino** - High-performance logging
- **Resend** - Email service
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sachinchaurasiya360/CourseFlow
   cd CourseFlow
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/courseflow
   JWT_SECRET=your-jwt-secret-key
   RESEND_API_KEY=your-resend-api-key
   ```

5. **Start MongoDB**

   Make sure MongoDB is running on your system or update the `MONGODB_URI` to point to your cloud database.

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:3000`

2. **Start the frontend client**
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173`
## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json files for details.

## Author

**Sachin Chaurasiya**

---

*Built with ❤️ using modern web technologies*</content>
<parameter name="filePath">c:\CodeBase\CourseFlow\README.md