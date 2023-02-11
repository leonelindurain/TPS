const {getChats, getChatsByEmail} = require('../controllers/chats.controller')

const express = require("express");
const routerChat = express.Router();

routerChat.get('', getChats)
routerChat.get('/:email', getChatsByEmail)

module.exports = routerChat;
