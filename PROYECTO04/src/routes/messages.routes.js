const { messagesDao } = require("../daos/index");
const objMsg = messagesDao

const routerMsg = (socket, io) => {

    objMsg.getAll().then(chats => {
        io.sockets.emit('messageChat-server', chats);
    })

    socket.on('messageChat-new', messageComplete => {
        objMsg.save(messageComplete).then(res => {
            objMsg.getAll().then(chats => {
                io.sockets.emit('messageChat-server', chats);
            })
        }
        );
    })
}

module.exports = routerMsg