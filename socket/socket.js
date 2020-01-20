let global = require('../global/global');
let { Comments } = require('./comment');
let room = new Comments();
const {comment, replyComment} = require('../routes/comment');
let io = global.io;

io.on('connection', (socket) => {
    socket.on('join', (id, callback) => {
      if (id && typeof id === 'string') {
        let roomID = id.trim()
        socket.join(roomID);
        room.removeUser(socket.id);
        room.addUser(socket.id, roomID)
      } else {
        callback('Invalid RoomID')
      }
  });
    socket.on('createComment', (msg, callback) => {
        let user = room.getUser(socket.id);
        comment(msg.id, msg.cntGrp, msg.cnt).then((cnt) => {
          io.to(user.room).emit('newComment', cnt);
        }).catch(err => {
          console.log(err)
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
  
    socket.on('disconnect', () => {
        room.removeUser(socket.id);
    });
  });