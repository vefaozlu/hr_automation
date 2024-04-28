import { Request, Response } from 'express';
import Joi from 'joi';
import { Tests } from '../../database/models/tests.model';

const testSchema = Joi.object({
    appoinment_date: Joi.date().required(),
    driver_id: Joi.number().required(),
    doc_id: Joi.number().required(),
});

// GET /api/tests
const getTests = async (req: Request, res: Response) => {
    try {
        const tests = await Tests.findAll();

        res.status(200).json(tests);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/tests/:id
const getTest = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const test = await Tests.findOne({ where: { id } });
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }

        res.status(200).json(test);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/tests
const createTest = async (req: Request, res: Response) => {
    try {
        const { error, value } = testSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const test = await Tests.create(value);

        res.status(200).json({
            message: "Test created successfully",
            test: {
                id: test.id,
                appoinment_date: test.appoinment_date,
                driver_id: test.driver_id,
                doc_id: test.doc_id,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/tests/:id
const updateTest = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { error, value } = testSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const test = await Tests.findOne({ where: { id } });
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }

        await Tests.update(value, { where: { id } });

        res.status(200).json({
            message: "Test updated successfully",
            test: {
                id: test.id,
                appoinment_date: value.appoinment_date,
                driver_id: value.driver_id,
                doc_id: value.doc_id,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/tests/:id
const deleteTest = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const test = await Tests.findOne({ where: { id } });
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }

        await Tests.destroy({ where: { id } });

        res.status(200).json({ message: "Test deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getTests, getTest, createTest, updateTest, deleteTest };