import { Request, Response, } from 'express';

const getTest = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: 'Test route works' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getTest };