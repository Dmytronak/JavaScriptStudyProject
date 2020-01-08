const crypto = require('crypto');

export function passwordHashHelper(password: string, existSalt: string) {
    let salt = crypto.randomBytes(16).toString('hex');
    if (existSalt) {
        salt = existSalt;
    }
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

    const response = {
        salt: salt,
        hashPassword: hashPassword
    };

    return response;
}