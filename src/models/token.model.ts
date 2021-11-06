import { model, Schema } from 'mongoose';
import { IToken } from '../types/user.types';

const TokenModel = new Schema<IToken>({
    tokenId: String,
    userId: String
});

const Token = model<IToken>('Token', TokenModel);

module.exports = Token;
