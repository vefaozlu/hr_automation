import { Request, Response } from "express";
import joi from "joi";
import { UserJobTitles } from "../../database/models/user.job.titles.model";

const userJobTitlesSchema = joi.object({
    title_name: joi.string().required(),
    description: joi.string().required(),
});

// GET /api/user-job-titles
const getUserJobTitles = async (req: Request, res: Response) => {
    try {
        const userJobTitles = await UserJobTitles.findAll();

        res.status(200).json(userJobTitles);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/user-job-titles
const createUserJobTitles = async (req: Request, res: Response) => {
    try {
        const { error, value } = userJobTitlesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUserJobTitles = await UserJobTitles.findOne({ where: { title_name: value.title_name } });
        if (existingUserJobTitles) {
            return res.status(400).json({ error: "User Job Titles already exists" });
        }

        const newUserJobTitles = await UserJobTitles.create({
            title_name: value.title_name,
            description: value.description,
        });


        res.status(201).json({
            message: "User Job Titles created successfully",
            job_titles: {
                id: newUserJobTitles.id,
                title_name: newUserJobTitles.title_name,
                description: newUserJobTitles.description,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/user-job-titles/:id
const updateUserJobTitles = async (req: Request, res: Response) => {
    try {
        const { error, value } = userJobTitlesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const userJobTitles = await UserJobTitles.findByPk(req.params.id);
        if (!userJobTitles) {
            return res.status(404).json({ message: "User Job Titles not found" });
        }

        await userJobTitles.update({
            title_name: value.title_name,
            description: value.description,
        });

        res.status(200).json({
            message: "User Job Titles updated successfully",
            job_titles: {
                id: userJobTitles.id,
                title_name: userJobTitles.title_name,
                description: userJobTitles.description,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/user-job-titles/:id
const deleteUserJobTitles = async (req: Request, res: Response) => {
    try {
        const userJobTitles = await UserJobTitles.findByPk(req.params.id);
        if (!userJobTitles) {
            return res.status(404).json({ message: "User Job Titles not found" });
        }

        await userJobTitles.destroy();

        res.status(200).json({ message: "User Job Titles deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getUserJobTitles, createUserJobTitles, updateUserJobTitles, deleteUserJobTitles };