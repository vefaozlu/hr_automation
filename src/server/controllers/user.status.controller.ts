import { Request, Response } from "express";
import joi from "joi";
import { UserStatus } from "../../database/models/user.status.model";

const userStatusSchema = joi.object({
    status_name: joi.string().required(),
});

// GET /api/user-status
const getUserStatus = async (req: Request, res: Response) => {
    try {
        const userStatus = await UserStatus.findAll();

        res.status(200).json(userStatus);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/user-status
const createUserStatus = async (req: Request, res: Response) => {
    try {
        const { error, value } = userStatusSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUserStatus = await UserStatus.findOne({ where: { status_name: value.status_name } });
        if (existingUserStatus) {
            return res.status(400).json({ error: "User Status already exists" });
        }

        const newUserStatus = await UserStatus.create({
            status_name: value.status_name,
        });

        res.status(201).json({
            message: "User Status created successfully",
            status: {
                id: newUserStatus.id,
                status_name: newUserStatus.status_name,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/user-status/:id
const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { error, value } = userStatusSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const userStatus = await UserStatus.findOne({ where: { id: req.params.id } });
        if (!userStatus) {
            return res.status(404).json({ error: "User Status not found" });
        }

        const existingUserStatus = await UserStatus.findOne({ where: { status_name: value.status_name } });
        if (existingUserStatus) {
            return res.status(400).json({ error: "User Status already exists" });
        }

        userStatus.status_name = value.status_name;
        await userStatus.save();

        res.status(200).json({
            message: "User Status updated successfully",
            status: {
                id: userStatus.id,
                status_name: userStatus.status_name,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/user-status/:id
const deleteUserStatus = async (req: Request, res: Response) => {
    try {
        const userStatus = await UserStatus.findByPk(req.params.id);
        if (!userStatus) {
            return res.status(404).json({ error: "User Status not found" });
        }

        await userStatus.destroy();

        res.status(200).json({ message: "User Status deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getUserStatus, createUserStatus, updateUserStatus, deleteUserStatus };