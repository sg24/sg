class Comments {
    constructor() {
        this.users = [];
        this.typing = [];
        this.lastMsg = [];
        this.pvtTyping = [];
        this.pvtUser = []
    }

    addPvtUser (host, reply, roomID) {
        let pvtUser = this.pvtUser.filter(userDet => 
            (userDet.reply === host && userDet.host === reply) || (userDet.reply === reply && userDet.host === host))[0];
        if (pvtUser) {
            let pvtUserIndex = this.pvtUser.findIndex(userDet => 
                (userDet.reply === host && userDet.host === reply) || (userDet.reply === reply && userDet.host === host));
            this.pvtUser[pvtUserIndex].room.push(roomID);
        } else {
            this.pvtUser.push({host, reply, room: [roomID]})
        }
    }

    addUser (id, room, pos) {
        var user = {id, room, pos};
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

    removePvtUser(id) {
        let pvtUser = []
        for (let user of this.pvtUser) {
            user.room = user.room.filter(roomID => roomID !== id);
            pvtUser.push(user);
        }
        this.pvtUser = pvtUser;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getPvtUser (id) {
        for(let user of this.pvtUser) {
            let room = user.room.filter(roomID => roomID === id)[0]
            if (room) {
                return user.room.filter(roomID => roomID !== id)[0]
            }
        }
        return null
    }

    getUserTyping(id) {
        return this.typing.filter((user) => user.id === id)[0];
    }

    getPvtTyping(id) {
        return this.pvtTyping.filter((user) => user.id === id)[0];
    }

    userTyping(id) {
        let userFnd = this.typing.filter((user) => user.id === id)
        if (userFnd.length < 1) {
            this.typing.push({id, intervalID: null});
        }
        let check  = setInterval(() =>{
            let userDet = this.typing.filter(user => user.id === id);
            if (userDet.length > 0) {
                let user = this.users.filter((user) => user.id === id)[0];
                if (!user) {
                    this.typing = this.typing.filter(user => user.id !== id);
                    clearInterval(check)
                } else {
                    this.typing = this.typing.filter(user => user.id !== id);
                    this.typing.push({id, intervalID: check})
                }
            } else {
                clearInterval(check)
            }
        }, 1000)
        return this.typing
    }

    pvtUserTyping(id) {
        let userFnd = this.pvtTyping.filter((user) => user.id === id)
        if (userFnd.length < 1) {
            this.pvtTyping.push({id, intervalID: null});
        }
        let check  = setInterval(() =>{
            let userDet = this.pvtTyping.filter(user => user.id === id);
            if (userDet.length > 0) {
                let user = this.users.filter((user) => user.id === id)[0];
                if (!user) {
                    this.pvtTyping = this.pvtTyping.filter(user => user.id !== id);
                    clearInterval(check)
                } else {
                    this.pvtTyping = this.pvtTyping.filter(user => user.id !== id);
                    this.pvtTyping.push({id, intervalID: check})
                }
            } else {
                clearInterval(check)
            }
        }, 1000)
        return this.pvtTyping
    }

    cancelTyping(userID) {
        let check = this.typing.filter(user => user.id === userID)[0];
        if (check && check.intervalID) {
            clearInterval(check.intervalID)
        }
        this.typing = this.typing.filter(user => user.id !== userID);
        
        return this.typing
    }

    pvtcancelTyping(userID) {
        let check = this.pvtTyping.filter(user => user.id === userID)[0];
        if (check && check.intervalID) {
            clearInterval(check.intervalID)
        }
        this.pvtTyping = this.pvtTyping.filter(user => user.id !== userID);
        
        return this.pvtTyping
    }

    getUserList (room) {
        var users = this.users.filter((user) =>  user.room === room);
        var nameArray = users.map((user) => user.id);
        return nameArray;
    }

    defaultLastMsg(room, lastMsg) {
        let newLastMsg = {room, msg: lastMsg}
        let filterLastMsg = this.lastMsg.filter(cnt => cnt.room === room);
        if (filterLastMsg.length > 0) {
            filterLastMsg[0].msg = lastMsg;
            this.lastMsg = this.lastMsg.filter(cnt => cnt.room !== room);
            return this.lastMsg.push(filterLastMsg[0])
        }
        this.lastMsg.push(newLastMsg)
    }

    setLastMsg (userID, room, msg) {
        let groupMsg = this.lastMsg.filter(rooms => rooms.room === room);
        if (groupMsg.length > 0) {
            let lastMsg = groupMsg[0].msg.filter(msg => msg.userID === userID);
            if (lastMsg.length > 0) {
                lastMsg[0].msgCnt = {
                    msg,
                    created: new Date().toISOString()
                };
                let updateMsg = groupMsg[0].msg.filter(msg => msg.userID !== userID);
                updateMsg.push({
                    userID: lastMsg[0].userID,
                    msgCnt: lastMsg[0].msgCnt
                });
                let updateGroupMsg = {
                    room: groupMsg[0].room,
                    msg: updateMsg
                }
                let updateLastMsg = this.lastMsg.filter(rooms => rooms.room !== room);
                updateLastMsg.push(updateGroupMsg)
                this.lastMsg = updateLastMsg;
                return this.lastMsg
            } 
            groupMsg[0].msg.push({
                userID,
                msgCnt: {
                    msg,
                    created: new Date().toISOString()
                }
            })
            let update = this.lastMsg.filter(rooms => rooms.room !== room);
            update.push(groupMsg[0]);
            this.lastMsg = update;
            return this.lastMsg
        } else {
            this.lastMsg.push({
                room,
                msg: [{
                    userID,
                    msgCnt: {
                        msg,
                        created: new Date().toISOString()
                    }
                }]
            })
            return this.lastMsg
        }
    }

    getLastMsg = (room) => {
        let lastMsg = this.lastMsg.filter(rooms => rooms.room === room);
        if (lastMsg.length > 0) {
            return lastMsg[0].msg.pop().msgCnt;
        }
        return  null
    }
}

module.exports = {Comments}