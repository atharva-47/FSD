require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");


mongoose.connect(process.env.MONGO_URI, { })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));


const donationSchema = new mongoose.Schema({
    name: String,
    amount: Number
});
const Donation = mongoose.model("Donation", donationSchema);

// home 
app.get("/", async (req, res) => {
    const donations = await Donation.find();
    res.render("index", { donations });
});

//  Add new donation
app.post("/donate", async (req, res) => {
    await Donation.create({ name: req.body.name, amount: req.body.amount });
    res.redirect("/");
});

// Show edit form
app.get("/edit/:id", async (req, res) => {
    const donation = await Donation.findById(req.params.id);
    res.render("edit", { donation });
});

// UPDATE: Save edited donation
app.put("/update/:id", async (req, res) => {
    await Donation.findByIdAndUpdate(req.params.id, { name: req.body.name, amount: req.body.amount });
    res.redirect("/");
});

// DELETE: Remove donation
app.delete("/delete/:id", async (req, res) => {
    await Donation.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// Start Server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
