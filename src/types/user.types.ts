import { UserController } from '../controllers/user.controller';

export type UserControllerAction = (req: Request, res: Response, consumer: UserController) => void;

export interface INote {
    noteName: string;
    noteTitle: string;
    noteSubtitle?: string;
    noteDescription?: string;
    noteListItem?: Array<string>;
    nodeAuthor: any;
}

export interface INoteUpdateOptions {
    id: string;
    noteTitle: string,
    noteDescription: string;
}

export interface IUser {
    _id?: string;
    userName: string;
    userLastName: string;
    userEmail: string;
    userPhone: string;
    userPassword?: string;
}

export interface IToken {
    tokenId: string;
    userId: string;
}

export interface IChangePasswordOptions {
    userEmail: string;
    userPassword: string;
}

export type IChangePassword = IChangePasswordOptions | IUser;
