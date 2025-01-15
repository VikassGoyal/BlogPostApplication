# BlogApplication
  This blog application allows users to explore blogs from all users, create their own blogs, and edit or delete blogs they own. The 
   project is divided into two folders: one for the frontend and another for the backend.
  # Features
    User Authentication: Login and Sign-Up functionality to access the app.
  
    View Blogs: Browse through all blogs created by users.
  
    Create Blogs: Option for users to create new blogs.
  
    Edit and Delete Blogs: Users can edit or delete blogs they own.
  
    Logout: Securely log out from the application.

  # Frontend
    The frontend is built with Next.js, a React framework for building modern web applications.
   # Folder Structure
    . app/api/
    Contains all the API call functions used to interact with the backend.

    . app/components/
       reusable components, such as the Blog Card for displaying individual blogs.

    . app/splash/
       Contains the splash screen where users can log in or sign up. Clicking on the respective button navigates the user to the appropriate page.

    . app/main/
        The main folder contains the main.js file, the core screen after login or sign-up.

        . Displays a list of all blogs from all users.
        . Allows users to create new blogs.
        . Provides Edit and Delete options for blogs owned by the logged-in user.
        . Includes a logout button.
   # How to Run
    Prerequisites
    . Install Node.js (version 14.0.0 or higher).
    . Install npm (comes with Node.js) or yarn.

     Setup
    . git clone <repository-url> 
    . cd blogApplication/blogFrontend
    . npm install
    . npm run dev
    . Open your browser and navigate to:
      http://localhost:3000.

# Backend 
  The backend of this blog application is built using Node.js and the Express framework. The database used is PostgreSQL, and Sequelize 
  is employed as the ORM to interact with the database, avoiding raw SQL queries.
  # Features
    User Authentication: Implements JWT for generating tokens and authenticating users.
    
    CRUD Operations for Blogs:
    
    Create: Add new blog posts via POST.
    
    Read: Fetch all blog posts via GET.
    
    Update: Edit blog posts via PUT.
    
    Delete: Remove blog posts via DELETE.
    
    Password Management: Uses bcrypt for securely comparing and storing passwords.

  # Folder Structure
 
    . migrations/
      Contains all migration files that define the schema for the database.
    
    . models/
      Sequelize models for the User and Post tables.
      User Model: Defines the structure for the User table (e.g., username, password).
      Post Model: Defines the structure for the Post table (e.g., title, content, uniqueId).
     
    . index.js
      The main file where all API routes are defined:

      GET /posts: Fetches all blog posts.
      POST /posts: Creates a new blog post.
      PUT /posts/:id: Updates a blog post.
      DELETE /posts/:id: Deletes a blog post.
      Implements a middleware to authenticate the user using JWT.

    . .env.example
      Example environment file containing all the required keys for environment variables (e.g., database connection details, JWT 
      secret).

   # How to Run the Application
 
     Prerequisites
     . Install Node.js (version 14.0.0 or higher).
   
     . Install PostgreSQL and set it up on your system.
   
     . Ensure Sequelize and PostgreSQL dependencies are installed.

     Setup
     . git clone <repository-url>.
   
     . cd blogApplication/blogBackend .
   
     . npm install
   
     . Set up PostgreSQL:
   
       Install PostgreSQL on your system if you haven't already.
     
       Create a new database for the application.
     
     . Create a .env file based on the .env.example file and configure your environment variables.
       cp .env.example .env 
      
     . Configure the database connection in .env
   
     . Run the database migrations:
   
       npx sequelize-cli db:migrate
     
     . node index.js (start server on 3000)
