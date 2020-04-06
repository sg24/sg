let global = require('../global/global');
let { Comments } = require('./comment');
let room = new Comments();
const {members, comment, groupNotify,
  replyComment, typing, createChat, 
  mediaRecChat, groups, getUserID, 
  deleteChat, setLastMsg, userNotify} = require('../routes/comment');
const {conv, pvtcreateChat, pvtMediaRecChat, pvtDeleteChat} = require("../routes/pvtchat");

let io = global.io;

io.on('connection', (socket) => {
    socket.on('join', (id, callback) => {
      if (id && typeof id === 'string') {
        let roomID = id.trim()
        socket.join(roomID);
        room.removeUser(socket.id);
        room.addUser(socket.id, roomID);
        members(roomID).then(member => {
          io.to(roomID).emit('member', member.memberDet);
          room.defaultLastMsg(roomID, member.lastMsg);
        })
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

    socket.on('setLastMsg', (msg, callback) => {
      let user = room.getUser(socket.id);
     if (user) {
      setLastMsg(user.room).then(() => {
        
      }).catch(err => {
        callback(err)
      });
     }
    })

    socket.on('usertyping', (msg, callback) => {
      let user = room.getUser(socket.id);
      typing().then(userID => {
        if (!room.getUserTyping(userID) && user) {
          io.to(user.room).emit('typing', room.userTyping(userID))
          setLastMsg(user.room).then(() => {
            members(user.room).then(member => {
              io.to(user.room).emit('member', member.memberDet);
              room.defaultLastMsg(user.room, member.lastMsg);
              groupNotify().then(notifyCnt => {
                socket.emit('getGroupNotify', notifyCnt)
                userNotify().then(chatNotify => {
                  socket.emit('getUserNotify', chatNotify)
                })
              })
            })
          })
        }
      }).catch(err => {
        callback(err)
      });
    })

    socket.on('pvtusertyping', (msg, callback) => {
      let user = room.getUser(socket.id);
      typing().then(userID => {
        if (!room.getPvtTyping(userID) && user) {
          io.to(user.room).emit('typing', room.pvtUserTyping(userID))
          conv().then(member => {
            socket.emit('member', member);
            groupNotify().then(notifyCnt => {
              socket.emit('getGroupNotify', notifyCnt)
              userNotify().then(chatNotify => {
                socket.emit('getUserNotify', chatNotify)
              })
            })
          })
        }
      }).catch(err => {
        callback(err)
      });
    })

    socket.on('canceltyping', (msg, callback) => {
      let user = room.getUser(socket.id);
      typing().then(userID => {
        if (user) {
          io.to(user.room).emit('typing', room.cancelTyping(userID))
        }
      }).catch(err => {
        callback(err)
      });
    })

    socket.on('pvtcanceltyping', (msg, callback) => {
      let user = room.getUser(socket.id);
      typing().then(userID => {
        if (user) {
          io.to(user.room).emit('typing', room.pvtcancelTyping(userID))
        }
      }).catch(err => {
        callback(err)
      });
    })

    socket.on('createChat', (msgCnt, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        getUserID().then(userID => {
          let lastMsg = room.setLastMsg(userID, user.room, msgCnt.msg)
          createChat(user.room, msgCnt, lastMsg).then(chat =>{
            io.to(user.room).emit('newChat', chat)
            setLastMsg(user.room).then(() => {
              members(user.room).then(member => {
                io.to(user.room).emit('member', member.memberDet);
                room.defaultLastMsg(user.room, member.lastMsg)
                groupNotify().then(notifyCnt => {
                  socket.emit('getGroupNotify', notifyCnt)
                  userNotify().then(chatNotify => {
                    socket.emit('getUserNotify', chatNotify)
                  })
                })
              })
            })
          }).catch(err => {
            callback(err)
          })
        })
      }
    })

    socket.on('pvtcreateChat', (msgCnt, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        pvtcreateChat(user.room, msgCnt).then(chat =>{
          io.to(user.room).emit('newChat', chat)
          conv().then(member => {
            socket.emit('member', member);
            groupNotify().then(notifyCnt => {
              socket.emit('getGroupNotify', notifyCnt)
              userNotify().then(chatNotify => {
                socket.emit('getUserNotify', chatNotify)
              })
            })
          })
        }).catch(err => {
          callback(err)
        })
      }
    })

    socket.on('checkMember', (msgCnt, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        setLastMsg(user.room).then(() => {
          members(user.room).then(member => {
            io.to(user.room).emit('member', member.memberDet);
            room.defaultLastMsg(user.room, member.lastMsg)
          })
        })
      }
    })

    socket.on('deleteChat', (cnt) => {
      let user = room.getUser(socket.id);
      if (user)  {
        deleteChat(user.room, cnt, room.lastMsg).then(() => {
          setLastMsg(user.room).then(() => {
            members(user.room).then(member => {
              io.to(user.room).emit('member', member.memberDet);
              room.defaultLastMsg(user.room, member.lastMsg)
              groupNotify().then(notifyCnt => {
                socket.emit('getGroupNotify', notifyCnt)
                userNotify().then(chatNotify => {
                  socket.emit('getUserNotify', chatNotify)
                })
              })
            })
          })
          io.to(user.room).emit('chatRemoved', cnt);
        })
      }
    })

    socket.on('pvtDeleteChat', (cnt) => {
      let user = room.getUser(socket.id);
      if (user)  {
        pvtDeleteChat(user.room, cnt).then(() => {
          conv().then(member => {
            socket.emit('member', member);
            groupNotify().then(notifyCnt => {
              socket.emit('getGroupNotify', notifyCnt)
              userNotify().then(chatNotify => {
                socket.emit('getUserNotify', chatNotify)
              })
            })
          })
          io.to(user.room).emit('chatRemoved', cnt);
        })
      }
    })

    socket.on('mediaRecChat', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
          io.to(user.room).emit('newChat', msg)
          setLastMsg(user.room).then(() => {
          members(user.room).then(member => {
            io.to(user.room).emit('member', member.memberDet);
            room.defaultLastMsg(user.room, member.lastMsg)
            groupNotify().then(notifyCnt => {
              socket.emit('getGroupNotify', notifyCnt)
              userNotify().then(chatNotify => {
                socket.emit('getUserNotify', chatNotify)
              })
            })
          })
        }).catch(err => {
          callback(err)
        })
      }
    })

    socket.on('pvtMediaRecChat', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        io.to(user.room).emit('newChat', msg)
          conv().then(member => {
            socket.emit('member', member);
            groupNotify().then(notifyCnt => {
              socket.emit('getGroupNotify', notifyCnt)
              userNotify().then(chatNotify => {
                socket.emit('getUserNotify', chatNotify)
              })
            })
          }).catch(err => {
            callback(err)
        })
      }
    })

    socket.on('snapshot', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        mediaRecChat(user.room, msg).then(chat =>{
          io.to(user.room).emit('newChat', chat)
          setLastMsg(user.room).then(() => {
            members(user.room).then(member => {
              io.to(user.room).emit('member', member.memberDet);
              room.defaultLastMsg(user.room, member.lastMsg)
            })
          })
        }).catch(err => {
          callback(err)
        })
      }
    })

    socket.on('groups', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        groups().then(group => {
          io.emit('allgroup', group)
        }).catch(err => {
          callback(err)
        })
      }
    })

    socket.on('groupNotify', (msg, callback) => {
      let user = room.getUser(socket.id);
      if (user)  {
        groupNotify().then(notifyCnt => {
          io.to(user.room).emit('getGroupNotify', notifyCnt)
        }).catch(err => {
          callback(err)
        })
      }
    })

    socket.on('disconnect', () => {
        let user = room.removeUser(socket.id);
        if (user) {
          setLastMsg(user.room).then(() => {
            members(user.room).then(member => {
              io.to(user.room).broadcast('member', member.memberDet);
              room.defaultLastMsg(user.room, member.lastMsg)
            })
          })
        }
    });
  });