let global = require('../global/global');
let { Comments } = require('./comment');
let { Users } = require('./users');
let room = new Comments();
let user = new Users();
// const {comment, replyComment } = require('../routes/comment');

let io = global.io;
io.on('connection', (socket) => {
      socket.on('join', (type, sender, reciepent, room, callback) => {
        if (type) {
          if (type === 'private' && room) {
            user.removeUser(sender, reciepent);
            user.addUser(sender, reciepent, room);
            socket.join(room);
            return callback('joined');
          }
          socket.join(reciepent);
          return callback('joined')
        } else {
          return callback('Invalid Room')
        }
    });

    socket.on('shareChat', (reciepent, sender, cnt, callback) => {
        for (let userID of reciepent) {
          let userInfo = user.getReciepentInfo(userID, sender);
          if (userInfo && userInfo.room) {
            socket.to(userInfo.room).emit('recieveChat', cnt, userInfo.room);
          }
        }
    });
  
    socket.on('sendChat', (reciepent, sender, cnt, callback) => {
      let userInfo = user.getReciepentInfo(reciepent, sender);
      if (userInfo && userInfo.room) {
        socket.to(userInfo.room).emit('recieveChat', cnt, userInfo.room);
      }
    });

    socket.on('createReplyComment', (cnt, callback) => {
      let user = room.getUser(socket.id);
      if (user && user.room) {
        io.to(user.room).emit('newReplyComment', {cnt: cnt.cnts, id: cnt.id})
      }
    })

    socket.on('usertyping', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (!room.getUserTyping(user.host) && user) {
        io.to(user.room).emit('typing', room.userTyping(user.host))
      }
    })

    socket.on('pvtusertyping', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user) {
        let roomID = room.getPvtUser(socket.id);
        if (!room.getPvtTyping(user.host)) {
          if (roomID) {
            io.to(roomID).emit('typing', room.pvtUserTyping(user.host))
            socket.emit('typing', room.pvtUserTyping(user.host))
          } else {
            socket.emit('typing', room.pvtUserTyping(user.host))
          }
        }
      }
    })

    socket.on('canceltyping', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user) {
        io.to(user.room).emit('typing', room.cancelTyping(user.host))
      }
    })

    socket.on('pvtcanceltyping', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user) {
        let roomID = room.getPvtUser(socket.id);
        if (roomID) {
          io.to(roomID).emit('typing', room.pvtcancelTyping(user.host))
          socket.emit('typing', room.pvtcancelTyping(user.host))
        } else {
          socket.emit('typing', room.pvtcancelTyping(user.host))
        }
      }
    })

    socket.on('createChat', (chat, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        io.to(user.room).emit('newChat', chat)
      }
    })

    socket.on('pvtcreateChat', (msgCnt, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
         let roomID = room.getPvtUser(socket.id);
          if (roomID) {
            let cnt = {...msgCnt[0], image: msgCnt[0].ID !== user.room}
            io.to(roomID).emit('newChat', [cnt])
            socket.emit('newChat', msgCnt)
          } else {
            socket.emit('newChat', msgCnt)
          }
      }
    })

    socket.on('deleteChat', (cnt) => {
      let user = room.getUser(socket.id);
      if (user)  {
          io.to(user.room).emit('chatRemoved', cnt);
      }
    })

    socket.on('pvtDeleteChat', (cnt) => {
      let roomID = room.getPvtUser(socket.id);
      if (roomID) {
        io.to(roomID).emit('chatRemoved', cnt);
        socket.emit('chatRemoved', cnt);
      } else {
        socket.emit('chatRemoved', cnt);
      }
    })

    socket.on('mediaRecChat', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        io.to(user.room).emit('newChat', msg)
      }
    })

    socket.on('pvtMediaRecChat', (msg, callback) => {
      let roomID = room.getPvtUser(socket.id);
      if (roomID) {
        io.to(roomID).emit('newChat', msg)
        socket.emit('newChat', msg)
      } else {
        socket.emit('newChat', msg)
      }
    })

    socket.on('disconnect', () => {
        let user = room.removeUser(socket.id);
        if(user && (user.pos === 3)) {
          room.removePvtUser(socket.id);
        }
    });
  });