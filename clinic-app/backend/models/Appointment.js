const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientName: String,
    doctorName: String,
    date: String,
    time: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);
