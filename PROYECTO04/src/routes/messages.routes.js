const { messagesDao } = require("../daos/index");
const objMessages = messagesDao

const routerMessagesWebsockets = (socket, io) => {

    // ----------------- Chat Websockets ------------------------------- //

    objMessages.getAll().then(chats => {
        io.sockets.emit('messageChat-server', chats);
    })

    socket.on('messageChat-new', messageComplete => {
        objMessages.save(messageComplete).then(res => {
            objMessages.getAll().then(chats => {
                io.sockets.emit('messageChat-server', chats);
            })
        }
        );
    })
}

module.exports = routerMessagesWebsockets