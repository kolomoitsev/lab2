import { model, Schema } from 'mongoose';
import { INote } from '../types/user.types';



const Note = new Schema<INote>(
    {
        noteName: {
            type: String,
            required: true,
            unique: true
        },
        noteTitle: {
            type: String,
            required: true
        },
        noteSubtitle: {
            type: String,
            required: false
        },
        noteDescription: {
            type: String,
            required: false
        },
        noteListItem: {
            type: [[String]],
            required: false
        },
        nodeAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }

    },
    {
        timestamps: true
    }
).index({
    'noteTitle': 'text',
    'noteDescription': 'text'
});

const NoteModel = model<INote>('Note', Note);

module.exports = NoteModel;
