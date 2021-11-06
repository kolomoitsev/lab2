export const config = {
    MONGOOSE_LINK:
        'mongodb+srv://kolomoitsev:HVZD4EdjqXNV6ihQ@cluster0.hnn0k.mongodb.net/uni',
    jwt: {
        secret: 'sigmatestkey',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '2m'
            },
            refresh: {
                type: 'refresh',
                expiresIn: '5m'
            }
        }
    }
};
