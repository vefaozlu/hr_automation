import express from "express";
import { createUserJobTitles, getUserJobTitles, updateUserJobTitles, deleteUserJobTitles } from "../controllers/user.job.titles.controller";
import { getUserStatus, createUserStatus, updateUserStatus, deleteUserStatus } from "../controllers/user.status.controller";
import { getUserRoles, createUserRoles, updateUserRoles, deleteUserRoles } from "../controllers/user.roles.controller";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.controller";
import { getUserAddresses, getUserAddress, createUserAddress, updateUserAddress, deleteUserAddress } from "../controllers/user.addresses.controller";
import { getUserSkills, createUserSkills, updateUserSkills, deleteUserSkills } from "../controllers/user.skills.controller";
import { getUserProfiles, getUserProfile, createUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/user.profile.controller";
import {getTeamLeads, getTeamLead, createTeamLead, updateTeamLead, deleteTeamLead} from "../controllers/team.lead.controller";
import {getRecruiters, getRecruiter, createRecruiter, updateRecruiter, deleteRecruiter} from "../controllers/recruiters.controller";
import {getDrivers, getDriver, createDriver, updateDriver, deleteDriver} from "../controllers/drivers.controller";
import {getTests, getTest, createTest, updateTest, deleteTest} from "../controllers/tests.controller";
import {getNotes, getNote, createNote, updateNote, deleteNote} from "../controllers/notes.controller";
const router = express.Router();

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

// Define the routes for the team lead controller
router.get("/api/team-leads", getTeamLeads);
router.get("/api/team-leads/:id", getTeamLead);
router.post("/api/team-leads", createTeamLead);
router.put("/api/team-leads/:id", updateTeamLead);
router.delete("/api/team-leads/:id", deleteTeamLead);

// Define the routes for the recruiters controller
router.get("/api/recruiters", getRecruiters);
router.get("/api/recruiters/:id", getRecruiter);
router.post("/api/recruiters", createRecruiter);
router.put("/api/recruiters/:id", updateRecruiter);
router.delete("/api/recruiters/:id", deleteRecruiter);

// Define the routes for the drivers controller
router.get("/api/drivers", getDrivers);
router.get("/api/drivers/:id", getDriver);
router.post("/api/drivers", createDriver);
router.put("/api/drivers/:id", updateDriver);
router.delete("/api/drivers/:id", deleteDriver);

// Define the routes for the tests controller
router.get("/api/tests", getTests);
router.get("/api/tests/:id", getTest);
router.post("/api/tests", createTest);
router.put("/api/tests/:id", updateTest);
router.delete("/api/tests/:id", deleteTest);

// Define the routes for the notes controller
router.get("/api/notes", getNotes);
router.get("/api/notes/:id", getNote);
router.post("/api/notes", createNote);
router.put("/api/notes/:id", updateNote);
router.delete("/api/notes/:id", deleteNote);

export default router;