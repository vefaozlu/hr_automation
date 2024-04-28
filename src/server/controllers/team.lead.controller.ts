import { Request, Response } from 'express';
import Joi from 'joi';
import { TeamLeads } from '../../database/models/team.leads.model';

const teamLeadSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

// GET /api/team-leads
const getTeamLeads = async (req: Request, res: Response) => {
    try {
        const teamLeads = await TeamLeads.findAll();

        res.status(200).json(teamLeads);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/team-leads/:id
const getTeamLead = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const teamLead = await TeamLeads.findOne({ where: { id } });
        if (!teamLead) {
            return res.status(404).json({ error: "Team Lead not found" });
        }

        res.status(200).json(teamLead);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/team-leads
const createTeamLead = async (req: Request, res: Response) => {
    try {
        const { error, value } = teamLeadSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingTeamLead = await TeamLeads.findOne({ where: { email: value.email } });
        if (existingTeamLead) {
            return res.status(400).json({ error: "Team Lead already exists" });
        }

        const teamLead = await TeamLeads.create(value);

        res.status(200).json({
            message: "Team Lead created successfully",
            team_lead: {
                id: teamLead.id,
                name: teamLead.name,
                email: teamLead.email,
                phone: teamLead.phone,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/team-leads/:id
const updateTeamLead = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { error, value } = teamLeadSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const teamLead = await TeamLeads.findOne({ where: { id } });
        if (!teamLead) {
            return res.status(404).json({ error: "Team Lead not found" });
        }

        await TeamLeads.update(value, { where: { id } });

        res.status(200).json({
            message: "Team Lead updated successfully",
            team_lead: {
                id: teamLead.id,
                name: value.name,
                email: value.email,
                phone: value.phone,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/team-leads/:id
const deleteTeamLead = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const teamLead = await TeamLeads.findOne({ where: { id } });
        if (!teamLead) {
            return res.status(404).json({ error: "Team Lead not found" });
        }

        await TeamLeads.destroy({ where: { id } });

        res.status(200).json({ message: "Team Lead deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getTeamLeads, getTeamLead, createTeamLead, updateTeamLead, deleteTeamLead };