'use server';

const bcrypt = require('bcrypt');

module.exports = async (password) => {
    const saltRounds = 9;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};
