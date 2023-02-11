const ContainerFile = require('../../containers/containerFile');
const route = './database/messages.json'
const fs = require('fs');


class MessagesDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }
}

module.exports = MessagesDaoFile