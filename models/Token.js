const mongoose = require('mongoose');

const tokenShema = new mongoose.Schema({
    token: String,
});

const Token = mongoose.model('Token', tokenShema);

module.exports = Token;