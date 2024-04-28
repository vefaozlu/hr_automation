import { Request, Response } from 'express';
import Joi from 'joi';
import { Drivers } from '../../database/models/drivers.model';

const driverSchema = Joi.object({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    position: Joi.string().required(),
    company: Joi.string().required(),
    source: Joi.string().required(),
    test_count: Joi.number().required(),
    status: Joi.string().required(),
    recruiter_id: Joi.number().required(),
});

// GET /api/drivers
const getDrivers = async (req: Request, res: Response) => {
    try {
        const drivers = await Drivers.findAll();

        res.status(200).json(drivers);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/drivers/:id
const getDriver = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const driver = await Drivers.findOne({ where: { id } });
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }

        res.status(200).json(driver);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/drivers
const createDriver = async (req: Request, res: Response) => {
    try {
        const { error, value } = driverSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingDriver = await Drivers.findOne({ where: { email: value.email } });
        if (existingDriver) {
            return res.status(400).json({ error: "Driver already exists" });
        }

        const driver = await Drivers.create(value);

        res.status(200).json({
            message: "Driver created successfully",
            driver: {
                id: driver.id,
                name: driver.name,
                last_name: driver.last_name,
                email: driver.email,
                phone: driver.phone,
                position: driver.position,
                company: driver.company,
                source: driver.source,
                test_count: driver.test_count,
                status: driver.status,
                recruiter_id: driver.recruiter_id,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/drivers/:id
const updateDriver = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { error, value } = driverSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const driver = await Drivers.findOne({ where: { id } });
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }

        // TODO: maili güncelleme
        await driver.update(value);

        res.status(200).json({
            message: "Driver updated successfully",
            driver: {
                id: driver.id,
                name: driver.name,
                last_name: driver.last_name,
                email: driver.email,
                phone: driver.phone,
                position: driver.position,
                company: driver.company,
                source: driver.source,
                test_count: driver.test_count,
                status: driver.status,
                recruiter_id: driver.recruiter_id,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/drivers/:id
const deleteDriver = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const driver = await Drivers.findOne({ where: { id } });
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }

        await Drivers.destroy({ where: { id } });

        res.status(200).json({ message: "Driver deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getDrivers, getDriver, createDriver, updateDriver, deleteDriver };