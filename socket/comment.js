class Comments {
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
}

module.exports = {Comments}