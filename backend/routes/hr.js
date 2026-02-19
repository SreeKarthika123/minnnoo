// import express from "express";
// import { createVacancy, getVacancies } from "../controllers/hrController.js";
// import { verifyToken, verifyHR } from "../middleware/authMiddleware.js";


const express = require("express");
const router = express.Router();
const { createVacancy, getVacancies } = require("../controllers/hrController");
const Vacancy = require("../models/Vacancy");
// HR creates a vacancy
router.post("/vacancies", createVacancy);

// Employees can view vacancies
router.get("/vacancies", getVacancies);

router.delete("/vacancies/:id", async (req, res) => {
  try {
    await Vacancy.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

router.get("/vacancies/:id", async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    res.json(vacancy);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;