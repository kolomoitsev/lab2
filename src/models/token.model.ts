import { model, Schema } from 'mongoose';

interface IToken {
    tokenId: string;
    userId: string;
}

const TokenModel = new Schema<IToken>({
    tokenId: String,
    userId: String
});

const Token = model<IToken>('Token', TokenModel);

module.exports = Token;
