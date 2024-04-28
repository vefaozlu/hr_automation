import { Request, Response } from "express";
import joi from "joi";
import { UserRoles } from "../../database/models/user.roles.model";

const userRolesSchema = joi.object({
    role_name: joi.string().required(),
});

// GET /api/user-roles
const getUserRoles = async (req: Request, res: Response) => {
    try {
        const userRoles = await UserRoles.findAll();

        res.status(200).json(userRoles);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/user-roles
const createUserRoles = async (req: Request, res: Response) => {
    try {
        const { error, value } = userRolesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUserRoles = await UserRoles.findOne({ where: { role_name: value.role_name } });
        if (existingUserRoles) {
            return res.status(400).json({ error: "User Roles already exists" });
        }

        const newUserRoles = await UserRoles.create({
            role_name: value.role_name,
        });

        res.status(201).json({
            message: "User Roles created successfully",
            roles: {
                id: newUserRoles.id,
                role_name: newUserRoles.role_name,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/user-roles/:id
const updateUserRoles = async (req: Request, res: Response) => {
    try {
        const { error, value } = userRolesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const userRoles = await UserRoles.findOne({ where: { id: req.params.id } });
        if (!userRoles) {
            return res.status(404).json({ error: "User Roles not found" });
        }

        const existingUserRoles = await UserRoles.findOne({ where: { role_name: value.role_name } });
        if (existingUserRoles) {
            return res.status(400).json({ error: "User Roles already exists" });
        }

        await UserRoles.update({
            role_name: value.role_name,
        }, { where: { id: req.params.id } });

        res.status(200).json({
            message: "User Roles updated successfully",
            roles: {
                id: userRoles.id,
                role_name: value.role_name,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/user-roles/:id
const deleteUserRoles = async (req: Request, res: Response) => {
    try {
        const userRoles = await UserRoles.findByPk(req.params.id);
        if (!userRoles) {
            return res.status(404).json({ error: "User Roles not found" });
        }

        await userRoles.destroy();

        res.status(200).json({ message: "User Roles deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getUserRoles, createUserRoles, updateUserRoles, deleteUserRoles }