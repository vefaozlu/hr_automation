import express from "express";
import { getTest } from "../controllers/test.controller";
const router = express.Router();

// Define the route for the test controller
router.get("/test", getTest);

export default router;