import { Request, Response } from 'express';
import Joi from 'joi';
import { Notes } from '../../database/models/notes.model';

const noteSchema = Joi.object({
    note: Joi.string().required(),
    driver_id: Joi.number().required(),
    creator_id: Joi.number().required(),
});

// GET /api/notes
const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Notes.findAll();

        res.status(200).json(notes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/notes/:id
const getNote = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const note = await Notes.findOne({ where: { id } });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json(note);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// POST /api/notes
const createNote = async (req: Request, res: Response) => {
    try {
        const { error, value } = noteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const note = await Notes.create(value);

        res.status(200).json({
            message: "Note created successfully",
            note: {
                id: note.id,
                note: note.note,
                driver_id: note.driver_id,
                creator_id: note.creator_id,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /api/notes/:id
const updateNote = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { error, value } = noteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const note = await Notes.findOne({ where: { id } });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        await Notes.update(value, { where: { id } });

        res.status(200).json({ message: "Note updated successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /api/notes/:id
const deleteNote = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const note = await Notes.findOne({ where: { id } });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        await Notes.destroy({ where: { id } });

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export { getNotes, getNote, createNote, updateNote, deleteNote };