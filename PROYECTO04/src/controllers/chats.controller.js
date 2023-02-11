const { messagesDao } = require("../daos/index");
const message = messagesDao

const logger = require('../logger/logger');


const getChats = async (req, res) => {
    logger.info(`El usuario logueado es`);
    res.render('chat')
}

const getChatsByEmail = async (req, res) => {
    const { email } = req.params
    const messages = await message.getAllByEmail(email)
    res.json(messages)
}

module.exports = {
    getChats,
    getChatsByEmail
}