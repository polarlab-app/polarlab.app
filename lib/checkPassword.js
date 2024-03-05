const bcrypt = require('bcrypt');

async function comparePassword(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}

module.exports = comparePassword;
