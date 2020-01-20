class Users {
    constructor() {
        this.users = []; 
    }
    addUser (id, room) {
        var user = {id, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
       var user = this.getUser(id);
       if(user){
           this.users = this.users.filter((user) => user.id !== id);
       }
       return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList (room) {
     var users = this.users.filter((user) =>  user.room === room);
     var nameArray = users.map((user) => user.name);
     return nameArray;
    }
}

module.exports = {Users}