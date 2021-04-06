let global = require('../global/global');
let { Comments } = require('./comment');
let room = new Comments();
// const {comment, replyComment } = require('../routes/comment');

let io = global.io;

io.on('connection', (socket) => {
    //   socket.on('join', (id, callback) => {
    //     if (id) {
    //       socket.join(id);
    //       room.removeUser(socket.id);
    //       room.addUser(socket.id, id);
    //     } else {
    //       return callback('Invalid RoomID')
    //     }
    // });

    socket.on('sendChat', (cnt, reciepent, callback) => {
        for (let userID of reciepent) {
          socket.to(userID).emit('recieveChat', cnt)
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