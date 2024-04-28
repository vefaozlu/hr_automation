import { Request, Response } from "express";
import joi from "joi";
import { UserSkills } from "../../database/models/user.skills.model";
import { Users } from "../../database/models/users.model";

const userSkillsSchema = joi.object({
    user_id: joi.number().required(),
    skill_name: joi.string().required(),
    proficiency_level: joi.string().required()
});

// GET /api/user-skills
const getUserSkills = async (req: Request, res: Response) => {
    try {
        const userSkills = await UserSkills.findAll();

        res.status(200).json(userSkills);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/user-skills
const createUserSkills = async (req: Request, res: Response) => {
    try {
        const { error, value } = userSkillsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await Users.findOne({ where: { id: value.user_id } });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUserSkills = await UserSkills.findOne({ where: { user_id: value.user_id , skill_name: value.skill_name  } });
        if (existingUserSkills) {
            return res.status(400).json({ error: "User Skill already exists" });
        }

        const newUserSkills = await UserSkills.create({
            user_id: value.user_id,
            skill_name: value.skill_name,
            proficiency_level: value.proficiency_level
        });

        res.status(201).json(newUserSkills);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/user-skills/:id
const updateUserSkills = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { error, value } = userSkillsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await Users.findOne({ where: { id: value.user_id } });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUserSkills = await UserSkills.findOne({ where: { id } });
        if (!existingUserSkills) {
            return res.status(404).json({ error: "User Skill not found" });
        }

        await UserSkills.update({
            user_id: value.user_id,
            skill_name: value.skill_name,
            proficiency_level: value.proficiency_level
        }, { where: { id } });

        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/user-skills/:id
const deleteUserSkills = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const existingUserSkills = await UserSkills.findOne({ where: { id } });
        if (!existingUserSkills) {
            return res.status(404).json({ error: "User Skill not found" });
        }

        await UserSkills.destroy({ where: { id } });

        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getUserSkills, createUserSkills, updateUserSkills, deleteUserSkills };