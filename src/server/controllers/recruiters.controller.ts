import { Request, Response } from 'express';
import Joi from 'joi';
import { Recruiters } from '../../database/models/recruiters.model';

const recruiterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    hired_count: Joi.number().required(),
    group_count: Joi.number().required(),
    team_lead_id: Joi.number().required(),
});

// GET /api/recruiters
const getRecruiters = async (req: Request, res: Response) => {
    try {
        const recruiters = await Recruiters.findAll();

        res.status(200).json(recruiters);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/recruiters/:id
const getRecruiter = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recruiter = await Recruiters.findOne({ where: { id } });
        if (!recruiter) {
            return res.status(404).json({ error: "Recruiter not found" });
        }

        res.status(200).json(recruiter);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/recruiters
const createRecruiter = async (req: Request, res: Response) => {
    try {
        const { error, value } = recruiterSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingRecruiter = await Recruiters.findOne({ where: { email: value.email } });
        if (existingRecruiter) {
            return res.status(400).json({ error: "Recruiter already exists" });
        }

        const recruiter = await Recruiters.create(value);

        res.status(200).json({
            message: "Recruiter created successfully",
            recruiter: {
                id: recruiter.id,
                name: recruiter.name,
                email: recruiter.email,
                phone: recruiter.phone,
                hired_count: recruiter.hired_count,
                group_count: recruiter.group_count,
                team_lead_id: recruiter.team_lead_id,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/recruiters/:id
const updateRecruiter = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { error, value } = recruiterSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const recruiter = await Recruiters.findOne({ where: { id } });
        if (!recruiter) {
            return res.status(404).json({ error: "Recruiter not found" });
        }

        // TODO: not update mail if it already exists
        if (value.email && value.email !== recruiter.email) {
            const existingRecruiter = await Recruiters.findOne({ where: { email: value.email } });
            if (existingRecruiter) {
                return res.status(400).json({ error: "Recruiter already exists" });
            }
        }

        await Recruiters.update(value, { where: { id } });

        res.status(200).json({ message: "Recruiter updated successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/recruiters/:id
const deleteRecruiter = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recruiter = await Recruiters.findOne({ where: { id } });
        if (!recruiter) {
            return res.status(404).json({ error: "Recruiter not found" });
        }

        await Recruiters.destroy({ where: { id } });

        res.status(200).json({ message: "Recruiter deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getRecruiters, getRecruiter, createRecruiter, updateRecruiter, deleteRecruiter }; 