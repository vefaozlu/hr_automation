import { Request, Response } from 'express';
import joi from 'joi';
import { UserProfile } from '../../database/models/user.profile.model';
import { Users } from '../../database/models/users.model';

const userProfileSchema = joi.object({
    user_id: joi.number().required(),
    name: joi.string().required(),
    last_name: joi.string().required(),
    email_company: joi.string().required(),
    email_individual: joi.string().required(),
    phone_number: joi.string().required(),
    birth_date: joi.date().required(),
    gender: joi.string().required(),
    profile_picture: joi.string().required(),
    job_title_id: joi.number().required(),
    department: joi.string().required(),
    manager_id: joi.number().required(),
    hire_date: joi.date().required()
});

// GET /api/user-profiles
const getUserProfiles = async (req: Request, res: Response) => {
    try {
        const userProfiles = await UserProfile.findAll();

        res.status(200).json(userProfiles);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/user-profiles/:id
const getUserProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userProfile = await UserProfile.findOne({ where: { id } });
        if (!userProfile) {
            return res.status(404).json({ error: "User Profile not found" });
        }

        res.status(200).json(userProfile);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/user-profiles
const createUserProfile = async (req: Request, res: Response) => {
    try {
        const { error, value } = userProfileSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await Users.findOne({ where: { id: value.user_id } });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUserProfile = await UserProfile.findOne({ where: { user_id: value.user_id } });
        if (existingUserProfile) {
            return res.status(400).json({ error: "User Profile already exists" });
        }

        const newUserProfile = await UserProfile.create({
            user_id: value.user_id,
            name: value.name,
            last_name: value.last_name,
            email_company: value.email_company,
            email_individual: value.email_individual,
            phone_number: value.phone_number,
            birth_date: value.birth_date,
            gender: value.gender,
            profile_picture: value.profile_picture,
            job_title_id: value.job_title_id,
            department: value.department,
            manager_id: value.manager_id,
            hire_date: value.hire_date
        });

        res.status(200).json({
            message: "User Profile created successfully",
            profile: {
                id: newUserProfile.id,
                user_id: newUserProfile.user_id,
                name: newUserProfile.name,
                last_name: newUserProfile.last_name,
                email_company: newUserProfile.email_company,
                email_individual: newUserProfile.email_individual,
                phone_number: newUserProfile.phone_number,
                birth_date: newUserProfile.birth_date,
                gender: newUserProfile.gender,
                profile_picture: newUserProfile.profile_picture,
                job_title_id: newUserProfile.job_title_id,
                department: newUserProfile.department,
                manager_id: newUserProfile.manager_id,
                hire_date: newUserProfile.hire_date
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/user-profiles/:id
const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { error, value } = userProfileSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await Users.findOne({ where: { id: value.user_id } });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUserProfile = await UserProfile.findOne({ where: { id } });
        if (!existingUserProfile) {
            return res.status(404).json({ error: "User Profile not found" });
        }

        await UserProfile.update({
            user_id: value.user_id,
            name: value.name,
            last_name: value.last_name,
            email_company: value.email_company,
            email_individual: value.email_individual,
            phone_number: value.phone_number,
            birth_date: value.birth_date,
            gender: value.gender,
            profile_picture: value.profile_picture,
            job_title_id: value.job_title_id,
            department: value.department,
            manager_id: value.manager_id,
            hire_date: value.hire_date
        }, { where: { id } });

        res.status(200).json({ message: "User Profile updated successfully", profile: { id, ...value } });
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/user-profiles/:id
const deleteUserProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const existingUserProfile = await UserProfile.findOne({ where: { id } });
        if (!existingUserProfile) {
            return res.status(404).json({ error: "User Profile not found" });
        }

        await UserProfile.destroy({ where: { id } });

        res.status(200).json({ message: "User Profile deleted successfully" });
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getUserProfiles, getUserProfile, createUserProfile, updateUserProfile, deleteUserProfile };