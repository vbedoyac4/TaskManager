Task Manager Application

Overview
This is a Task Manager application built with React for the frontend and .NET for the backend. It allows users to manage tasks, including creating, updating, and deleting tasks. The application employs Domain-Driven Design (DDD) and SOLID principles to ensure a clean, maintainable, and scalable architecture.

Features
    User authentication
    CRUD operations for tasks
    Real-time updates using WebSocket
    Responsive design

Technologies Used
    Frontend:
        React
        Redux
        Axios
        Tailwind CSS (for styling)

    Backend:
        .NET 6 or later
        ASP.NET Core
        Entity Framework Core
        MongoDB or SQL Server
        WebSocket

Getting Started

Follow these instructions to set up and run the project locally.

Prerequisites

    .NET 8 SDK or later
    Node.js (version 14 or higher)
    npm (version 6 or higher) or yarn
    MongoDB or SQL Server (or an equivalent database for the backend)

Steps

    Clone the repository: 
          https://github.com/vbedoyac4/TaskManager
          cd task-manager
    Run BackEnd:
        Navigate to the project directory: 
              cd TaskManagerBackend
        Restore dependencies and build the backend:
              dotnet restore
              dotnet build
        Run the backend server:
              dotnet run
    Run FrontEnd: 
        Navigate to the project directory:
            cd task-manager-frontend
        Install dependencies:
            npm install
        Start the development server:
            npm start

Access the application

    Open your browser and navigate to http://localhost:3000 to access the Task Manager application.

Usage: 

    Login: Use the login form to authenticate users. On successful login, users will be redirected to the task management page.
    Tasks Management: Users can add, update, and delete tasks. Tasks are displayed in a list and can be edited or removed.
  
        

    
          

          
