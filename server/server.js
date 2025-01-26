const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./models/db");
const authRoutes = require("./routes/auth-routes");
const formRoutes = require("./routes/form-routes");

const app = express();

app.use(bodyParser.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/auth", authRoutes);
app.use("/api/forms", formRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

module.exports = app;
