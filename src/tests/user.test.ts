import { validateUserEmail, validateUserName, validateUserPhone, checkTokenAssignee, checkTokenExpiration, compareHashedPasswords } from '../helpers/validation';
const jwt = require('jsonwebtoken');
describe('Testing user actions', () => {
    test('testing prompted email', () => {
        expect(validateUserEmail({
            userEmail: 'pavlo.kolomoitsev@nure.ua',
            userName: 'Pavlo',
            userLastName: 'Kolomoitsev',
            userPhone: '+380668750104'
        })).toBe(true);
    });

    test('testing prompted name', () => {
        expect(validateUserName({
            userEmail: 'pavlo.kolomoitsev@nure.ua',
            userName: 'Pavlo',
            userLastName: 'Kolomoitsev',
            userPhone: '+380668750104'
        })).toBe(true);
    })

    test('testing prompted phone', () => {
        expect(validateUserPhone({
            userEmail: 'pavlo.kolomoitsev@nure.ua',
            userName: 'Pavlo',
            userLastName: 'Kolomoitsev',
            userPhone: '+380668750104'
        })).toBe(true)
    })
});


describe('Testing token actions', () => {
    test('testing token corresponding assignee', ()=> {
        expect(checkTokenAssignee({
            _id: '6186fe32c5880ccea55d0473',
            userEmail: 'pavlo.kolomoitsev@nure.ua',
            userName: 'Pavlo',
            userLastName: 'Kolomoitsev',
            userPhone: '+380668750104'
        }, {
            tokenId: '609cb2fae4a64d0df2c039a8',
            userId: '6186fe32c5880ccea55d0473'
        })).toBe(true)
    })

    test('testing token expiration', () => {
        expect.assertions(1);
        try {
            expect(checkTokenExpiration('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDk2ZmQwOTI2N2M3NjU1MWZlOWNmMDUiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjIwNTA4OTcxLCJleHAiOjE2MjA1MDkwOTF9.2M3rG7B91OrdkULo4_MZq19YeLjOAsy4r6vuIl35oxU')).toBe(true);
        } catch(e) {
            expect(e).toBeInstanceOf(jwt.TokenExpiredError)
        }
    })

    test('test comparing hashed passwords', async () => {
        expect(await compareHashedPasswords('Pavel1999', {
            _id: '6186fe32c5880ccea55d0473',
            userEmail: 'pavlo.kolomoitsev@nure.ua',
            userName: 'Pavlo',
            userPassword: '$2b$10$uQ6AxS4x3u.Idz0FZucjnOorE6R1uuFiSN04LMJubD0XmHQV2wjQy',
            userLastName: 'Kolomoitsev',
            userPhone: '+380668750104'
        })).toBe(true)
    })

})


