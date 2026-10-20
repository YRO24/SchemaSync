
require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const studentRoutes = require("./src/routes/studentRoutes");
const { register, httpRequests } = require("./src/config/metrics");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    const route = req.route?.path
      ? `${req.baseUrl || ""}${req.route.path}`
      : "unmatched";

    httpRequests.inc({
      method: req.method,
      route,
      status: String(res.statusCode),
    });
  });

  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.get("/metrics", async (req, res, next) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    next(error);
  }
});

app.use("/api/students", studentRoutes);

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
