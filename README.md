# ⛩ AnimeLife 👺

## Description

AnimeLife is a website that allows you to watch anime using web scraping techniques. This project was developed primarily as an educational practice to learn and apply web scraping.

## Technologies Used:

- **Next.js**: React-based web development framework that allows the creation of fast and efficient web applications.

- **Tailwind CSS**: Is a CSS framework that provides a set of predefined classes that can be used directly in HTML to quickly and efficiently build user interfaces.

- **Node.js**: It is a JavaScript runtime environment that allows running JavaScript code on the server side.

- **MySQL**: It is an open-source Relational Database Management System (RDBMS) that uses Structured Query Language (SQL) to manage and manipulate data.

## Installation and Usage:

1. Clone this repository to your local machine.
2. Install Node.js `https://nodejs.org/en/download/current`.
3. Install dependencies using `npm install`.
4. Configure your connection to the database using the following code as an example::
    ```javascript
    const pool = mysql2.createPool({
     host: "Your host",
     user: "Your user",
     database: "The name of your database",
     password: "Your password",
     port: "Your port"
    })
5. Run the server using `npm run dev`.
6. Access the website from your preferred browser at `localhost:3000`.
