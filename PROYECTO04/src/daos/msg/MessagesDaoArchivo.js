const ContainerFile = require('../../containers/containerArchivo');
const route = './database/messages.json'
const fs = require('fs');


class MessagesDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }
}

module.exports = MessagesDaoFile