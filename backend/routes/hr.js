// import express from "express";
// import { createVacancy, getVacancies } from "../controllers/hrController.js";
// import { verifyToken, verifyHR } from "../middleware/authMiddleware.js";


const express = require("express");
const router = express.Router();
const { createVacancy, getVacancies } = require("../controllers/hrController");

// HR creates a vacancy
router.post("/vacancies", createVacancy);

// Employees can view vacancies
router.get("/vacancies", getVacancies);

module.exports = router;
