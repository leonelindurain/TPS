const ContainerFile = require('../../containers/containerArchivo');
const route = './database/users.json'
const fs = require('fs');


class UsersDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }
}

module.exports = UsersDaoFile