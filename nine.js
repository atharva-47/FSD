const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); // Built-in body parser

// GET route for home
app.get("/", (req, res) => {
  res.send(`
    <h2>Login Page</h2>
    <form action="/login" method="POST">
      <label>Username: <input type="text" name="username"></label><br>
      <label>Password: <input type="password" name="password"></label><br>
      <button type="submit">Login</button>
    </form>
  `);
});

// GET route for login page (optional)
app.get("/login", (req, res) => {
  res.send("<h2>Login Page</h2><a href='/'>Go Back</a>");
});

// POST route to handle login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials (Replace with a proper authentication method)
  if (username === "user" && password === "password") {
    res.send("<h2>Login Successful</h2><a href='/'>Go Back</a>");
  } else {
    res.send("<h2>Invalid Credentials</h2><a href='/'>Try Again</a>");
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
