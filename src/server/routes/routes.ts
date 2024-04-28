import express from "express";
import { getTest } from "../controllers/test.controller";
import { createUserJobTitles, getUserJobTitles, updateUserJobTitles, deleteUserJobTitles } from "../controllers/user.job.titles.controller";
import { getUserStatus, createUserStatus, updateUserStatus, deleteUserStatus } from "../controllers/user.status.controller";
import { getUserRoles, createUserRoles, updateUserRoles, deleteUserRoles } from "../controllers/user.roles.controller";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.controller";
import { getUserAddresses, getUserAddress, createUserAddress, updateUserAddress, deleteUserAddress } from "../controllers/user.addresses.controller";
import { getUserSkills, createUserSkills, updateUserSkills, deleteUserSkills } from "../controllers/user.skills.controller";
import { getUserProfiles, getUserProfile, createUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/user.profile.controller";
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

// Define the routes for the users controller
router.get("/api/users", getUsers);
router.get("/api/users/:id", getUser);
router.post("/api/users", createUser);
router.put("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);

// Define the routes for the user addresses controller
router.get("/api/user-addresses", getUserAddresses);
router.get("/api/user-addresses/:id", getUserAddress);
router.post("/api/user-addresses", createUserAddress);
router.put("/api/user-addresses/:id", updateUserAddress);
router.delete("/api/user-addresses/:id", deleteUserAddress);

// Define the routes for the user skills controller
router.get("/api/user-skills", getUserSkills);
router.post("/api/user-skills", createUserSkills);
router.put("/api/user-skills/:id", updateUserSkills);
router.delete("/api/user-skills/:id", deleteUserSkills);

// Define the routes for the user profiles controller
router.get("/api/user-profiles", getUserProfiles);
router.get("/api/user-profiles/:id", getUserProfile);
router.post("/api/user-profiles", createUserProfile);
router.put("/api/user-profiles/:id", updateUserProfile);
router.delete("/api/user-profiles/:id", deleteUserProfile);

export default router;