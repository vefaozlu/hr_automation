import { Request, Response } from "express";
import joi from "joi";
import { Users } from "../../database/models/users.model";

const usersSchema = joi.object({
    user_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    user_role_id: joi.number().required(),
    is_active_id: joi.number().required(),
    last_login: joi.date(),
    registration_date: joi.date()
});

// GET /api/users
const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await Users.findAll();

        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/users/:id
const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/users
const createUser = async (req: Request, res: Response) => {
    try {
        const { error, value } = usersSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await Users.findOne({ where: { email: value.email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await Users.create({
            user_name: value.user_name,
            email: value.email,
            password: value.password,
            user_role_id: value.user_role_id,
            is_active_id: value.is_active_id,
            last_login: value.last_login,
            registration_date: value.registration_date
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                user_name: newUser.user_name,
                email: newUser.email,
                user_role_id: newUser.user_role_id,
                is_active_id: newUser.is_active_id,
                last_login: newUser.last_login,
                registration_date: newUser.registration_date
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/users/:id
const updateUser = async (req: Request, res: Response) => {
    try {
        const { error, value } = usersSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await Users.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.update({
            user_name: value.user_name,
            email: value.email,
            password: value.password,
            user_role_id: value.user_role_id,
            is_active_id: value.is_active_id,
            last_login: value.last_login,
            registration_date: value.registration_date
        });

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user.id,
                user_name: user.user_name,
                email: user.email,
                user_role_id: user.user_role_id,
                is_active_id: user.is_active_id,
                last_login: user.last_login,
                registration_date: user.registration_date
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/users/:id
const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getUsers, getUser, createUser, updateUser, deleteUser };