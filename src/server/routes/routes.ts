import express from "express";
import { getTest } from "../controllers/test.controller";
import { createUserJobTitles, getUserJobTitles, updateUserJobTitles, deleteUserJobTitles } from "../controllers/user.job.titles.controller";
import {  getUserStatus, createUserStatus, updateUserStatus, deleteUserStatus   } from "../controllers/user.status.controller";
import { getUserRoles, createUserRoles, updateUserRoles, deleteUserRoles } from "../controllers/user.roles.controller";
const router = express.Router();

// Define the route for the test controller
router.get("/test", getTest);

// Define the routes for the user job titles controller
router.get("/api/user-job-titles", getUserJobTitles);
router.post("/api/user-job-titles", createUserJobTitles);
router.put("/api/user-job-titles/:id", updateUserJobTitles);
router.delete("/api/user-job-titles/:id", deleteUserJobTitles);

// Define the routes for the user status controller
router.get("/api/user-status", getUserStatus);
router.post("/api/user-status", createUserStatus);
router.put("/api/user-status/:id", updateUserStatus);
router.delete("/api/user-status/:id", deleteUserStatus);

// Define the routes for the user roles controller
router.get("/api/user-roles", getUserRoles);
router.post("/api/user-roles", createUserRoles);
router.put("/api/user-roles/:id", updateUserRoles);
router.delete("/api/user-roles/:id", deleteUserRoles);

export default router;