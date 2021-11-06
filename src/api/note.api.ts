import { NoteController } from '../controllers/note.controller';
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../helpers');

router
    .get('/get/:id', authenticateToken, async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const noteController = new NoteController();

            const note = await noteController.findOne(id);

            if (!note) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }

            return res.status(200).json(note);
        } catch (e) {
            return res.status(400).json({
                error: 'Error with finding exact note',
                e
            });
        }

    })

    .get('/getByUserId/:id', authenticateToken, async (req: Request, res: Response) => {
        const { id } = req.params;

        try {

            const noteController = new NoteController();

            const notes = await noteController.findByUser(id);

            if (!notes?.length) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }

            return res.status(200).json(notes);
        } catch (e) {
            return res.status(400).json({
                error: 'Error with finding notes',
                e
            });
        }

    })

    .post('/add', authenticateToken, async (req: Request, res: Response) => {
        const {
            noteName,
            noteTitle,
            noteSubtitle,
            noteDescription,
            noteListItem,
            nodeAuthor
        } = req.body;

        try {

            const noteController = new NoteController();

            await noteController.addNote({
                noteName,
                noteTitle,
                noteSubtitle,
                noteDescription,
                noteListItem,
                nodeAuthor
            });

            return res.status(200).json({
                noteName,
                noteTitle,
                noteSubtitle,
                noteDescription,
                noteListItem,
                nodeAuthor
            });
        } catch (e) {
            return res.status(400).json({
                error: 'Error with creating new note',
                e
            });
        }
    })

    .put('/edit', authenticateToken, async (req: Request, res: Response) => {

        const {
            id,
            noteTitle,
            noteDescription
        } = req.body;

        try {
            const noteController = new NoteController();

            const note = await noteController.editNote({
                id,
                noteTitle,
                noteDescription
            });

            if (!note) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }

            return res.status(200).json({ message: 'Updated' });
        } catch (e) {
            return res.status(400).json({
                error: 'Error with updating exact note',
                e
            });
        }

    })

    .get('/search/:query', async (req: Request, res: Response) => {
        const { query } = req.params;

        try {
            const noteController = new NoteController();

            const notes = await noteController.searchQuery(query);

            if (!notes?.length) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }

            return res.status(200).json(notes);
        } catch (e) {
            return res.status(400).json({
                error: 'Error with finding notes',
                e
            });
        }


    })

    .delete('/delete/:id', async (req: Request, res: Response) => {
        const { id } = req.params;

        try {

            const noteController = new NoteController();

            const removeOption = await noteController.deleteNote(id);

            if (!removeOption) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }
            return res.status(200).json({
                message: 'Successfully deleted'
            });
        } catch (e) {
            return res.status(400).json({
                error: 'Error with deleting exact note',
                e
            });
        }

    });

module.exports = router;
