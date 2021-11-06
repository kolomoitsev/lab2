import { INote, INoteUpdateOptions } from '../types/user.types';

const noteModel = require('./../models/note.model');


interface INoteController {
    findOne: (id) => Promise<INote>;
    findByUser: (id) => Promise<INote[]>;
    addNote: (opts: INote) => Promise<INote>;
    editNote: (opts: INoteUpdateOptions) => Promise<INote>;
    searchQuery: (search: string) => Promise<INote[]>;
    deleteNote: (id: number) => Promise<INote>;
}

export class NoteController implements INoteController {
    async addNote(opts: INote): Promise<INote> {
        return new noteModel(opts).save();
    }

    async deleteNote(id: number): Promise<INote> {
        return noteModel.findByIdAndDelete(id);
    }

    async editNote(opts: INoteUpdateOptions): Promise<INote> {
        return noteModel.findByIdAndUpdate(opts.id, {
            noteTitle: opts.noteTitle,
            noteDescription: opts.noteDescription
        });
    }

    async findByUser(id): Promise<INote[]> {
        return noteModel.find({
            nodeAuthor: id
        });
    }

    async findOne(id): Promise<INote> {
        return noteModel.findById(id);
    }

    async searchQuery(search: string): Promise<INote[]> {
        return noteModel.find({
            '$text': { '$search': search }
        });
    }

}
