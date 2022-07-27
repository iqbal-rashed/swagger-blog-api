require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");
const swagger = require("./docs/swagger");

// Middleware
app.use(express.json());
app.use(cors());

// Merge swagger
swagger.merge(app);

// API ROUTE
app.use("/api/auth", require("./routes/auth_route"));
app.use("/api/user", require("./routes/user_route"));
app.use("/api/blog", require("./routes/blog_route"));

// Server Listen
app.listen(
    process.env.PORT,
    console.log(`Server is running on ${process.env.PORT}...`)
);

// Connect Database
database.connect();
