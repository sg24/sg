let global = require('../global/global');
let { Comments } = require('./comment');
let room = new Comments();
const {comment, replyComment } = require('../routes/comment');

let io = global.io;

io.on('connection', (socket) => {
    socket.on('join', (id, callback) => {
      if (id) {
        if (!id.private && !id.public) {
          let roomID = id.trim()
          socket.join(roomID);
          room.removeUser(socket.id);
          room.addUser(socket.id, roomID, 1, null);
        }        

        if (id.public) {
          let roomID = id.room.trim()
          socket.join(roomID);
          room.removeUser(socket.id);
          room.addUser(socket.id, roomID, 2, id.host);
        }
        
        if (id.private) {
          room.removeUser(socket.id);
          room.addUser(socket.id, id.reply, 3, id.host);
          room.removePvtUser(socket.id)
          room.addPvtUser(id.host, id.reply, socket.id)
        }

      } else {
        return callback('Invalid RoomID')
      }
  });

    socket.on('createComment', (msg, callback) => {
        let user = room.getUser(socket.id);
        comment(msg.id, msg.cntGrp, msg.cnt).then((cnt) => {
          io.to(user.room).emit('newComment', cnt);
        }).catch(err => {
          callback(err)
        });
    });
  
    socket.on('createReplyComment', (msg, callback) => {
      let user = room.getUser(socket.id);
      replyComment(msg.id, msg.cntGrp, msg.cnt, msg.commentID).then(cnt => {
        io.to(user.room).emit('newReplyComment', {cnt, id: msg.id})
      }).catch(err => {
        callback(err)
      });
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