const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// ✅ Get all appointments
router.get("/", async (req, res) => {
    const appointments = await Appointment.find();
    res.json(appointments);
});

// ✅ Get a single appointment
router.get("/:id", async (req, res) => {
    const appt = await Appointment.findById(req.params.id);
    res.json(appt);
});

// ✅ Add an appointment
router.post("/add", async (req, res) => {
    await Appointment.create(req.body);
    res.redirect("/");
});

// ✅ Edit an appointment
router.post("/edit/:id", async (req, res) => {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

// ✅ Delete an appointment
router.get("/delete/:id", async (req, res) => {
    await Appointment.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

module.exports = router;
