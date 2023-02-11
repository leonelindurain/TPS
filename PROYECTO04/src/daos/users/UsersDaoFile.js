const ContainerFile = require('../../containers/containerFile');
const route = './database/users.json'
const fs = require('fs');


class UsersDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }
}

module.exports = UsersDaoFile