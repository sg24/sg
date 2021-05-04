class Users {
    constructor() {
        this.users = []; 
    }

    addUser (sender, reciepent, room) {
        var user = {id: sender, reciepent: [{id: reciepent, room}]};
        let userFnd = this.users.filter(cnt => cnt.id === sender)[0];
        if (userFnd) {
            userFnd.reciepent.push({id: reciepent, room});
            let userFndIndex = this.users.findIndex(cnt => cnt.id === sender);
            this.users[userFndIndex] = userFnd;
            return;
        }
        this.users.push(user);
        return user;
    }

    removeUser (sender, reciepent) {
       var user = this.getUser(sender);
       if(user){
           let updateReciepent = user.reciepent.filter((cnt) => cnt.id !== reciepent);
           user.reciepent = updateReciepent;
           let userIndex = this.users.findIndex((cnt) => cnt.id === sender);
           if (user.reciepent.length < 1) {
            this.users = this.users.filter((user) => user.id !== sender);
            return
           }
           this.users[userIndex] = user;
       }
       return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getReciepentInfo (reciepent, sender) {
        let user = this.users.filter((user) => user.id === reciepent)[0];
        if (user) {
            let reciepentInfo = user.reciepent.filter(cnt => cnt.id === sender)[0];
            if (reciepentInfo) {
                return reciepentInfo
            }
        }
        return null;
    }

    getUserList (room) {
     var users = this.users.filter((user) =>  user.room === room);
     var nameArray = users.map((user) => user.name);
     return nameArray;
    }
}

module.exports = {Users}