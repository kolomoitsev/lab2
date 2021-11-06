import { IToken } from '../types/user.types';

const tokenModel = require('./../models/token.model');

interface ITokenController {
    findToken: (id) => Promise<IToken>;
}


export class TokenController implements ITokenController {
    findToken(id): Promise<IToken> {
        return tokenModel
            .findOne({ tokenId: id })
            .exec();
    }
}
