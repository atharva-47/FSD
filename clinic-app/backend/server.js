const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("frontend")); // Serve HTML files

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/clinicDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ✅ Import and use routes
const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/appointments", appointmentRoutes);

// ✅ Start Server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
