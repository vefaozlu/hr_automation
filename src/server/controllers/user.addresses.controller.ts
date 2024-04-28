import { Request, Response } from "express";
import joi from "joi";
import { UserAddresses } from "../../database/models/user.addresses.model";
import { Users } from "../../database/models/users.model";

const userAddressesSchema = joi.object({
    user_id: joi.number().required(),
    address_line1: joi.string().required(),
    address_line2: joi.string(),
    city: joi.string().required(),
    state_province: joi.string().required(),
    postal_code: joi.string().required(),
    country: joi.string().required(),
    is_primary: joi.boolean().required(),
});

// GET /api/user-addresses
const getUserAddresses = async (req: Request, res: Response) => {
    try {
        const userAddresses = await UserAddresses.findAll();

        res.status(200).json(userAddresses);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/user-addresses/:id
const getUserAddress = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userAddress = await UserAddresses.findOne({ where: { id } });
        if (!userAddress) {
            return res.status(404).json({ error: "User Address not found" });
        }

        res.status(200).json(userAddress);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/user-addresses
const createUserAddress = async (req: Request, res: Response) => {
    try {
        const { error, value } = userAddressesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await Users.findOne({ where: { id: value.user_id } });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUserAddress = await UserAddresses.findOne({ where: { user_id: value.user_id } });
        if (existingUserAddress) {
            return res.status(400).json({ error: "User Address already exists" });
        }

        const newUserAddress = await UserAddresses.create({
            user_id: value.user_id,
            address_line1: value.address_line1,
            address_line2: value.address_line2,
            city: value.city,
            state_province: value.state_province,
            postal_code: value.postal_code,
            country: value.country,
            is_primary: value.is_primary,
        });

        res.status(201).json({
            message: "User Address created successfully",
            address: {
                id: newUserAddress.id,
                user_id: newUserAddress.user_id,
                address_line1: newUserAddress.address_line1,
                address_line2: newUserAddress.address_line2,
                city: newUserAddress.city,
                state_province: newUserAddress.state_province,
                postal_code: newUserAddress.postal_code,
                country: newUserAddress.country,
                is_primary: newUserAddress.is_primary,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/user-addresses/:id
const updateUserAddress = async (req: Request, res: Response) => {
    try {
        const { error, value } = userAddressesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await Users.findOne({ where: { id: value.user_id } });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const userAddress = await UserAddresses.findByPk(req.params.id);
        if (!userAddress) {
            return res.status(404).json({ message: "User Address not found" });
        }

        await userAddress.update({
            user_id: value.user_id,
            address_line1: value.address_line1,
            address_line2: value.address_line2,
            city: value.city,
            state_province: value.state_province,
            postal_code: value.postal_code,
            country: value.country,
            is_primary: value.is_primary,
        });

        res.status(200).json({
            message: "User Address updated successfully",
            address: {
                id: userAddress.id,
                user_id: userAddress.user_id,
                address_line1: userAddress.address_line1,
                address_line2: userAddress.address_line2,
                city: userAddress.city,
                state_province: userAddress.state_province,
                postal_code: userAddress.postal_code,
                country: userAddress.country,
                is_primary: userAddress.is_primary,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/user-addresses/:id
const deleteUserAddress = async (req: Request, res: Response) => {
    try {
        const userAddress = await UserAddresses.findByPk(req.params.id);
        if (!userAddress) {
            return res.status(404).json({ error: "User Address not found" });
        }

        await userAddress.destroy();

        res.status(200).json({ message: "User Address deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getUserAddresses, getUserAddress, createUserAddress, updateUserAddress, deleteUserAddress };