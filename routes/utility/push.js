const { user, authUser} = require('../../serverDB/serverDB');
const webpush = require('web-push');
const {  Expo } = require('expo-server-sdk');

module.exports = push = (somePushTokens=[], title='', body='', data={}) => {
    return new Promise((resolve, reject) => {
      let messages = [];
      let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
      for (let cnt of somePushTokens) {
        if (!Expo.isExpoPushToken(cnt.token)) {
          console.error(`Push token ${cnt.token} is not a valid Expo push token`);
          continue;
        }
        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
          to: cnt.token,
          sound: 'default',
          title,
          body,
          data
        })
      }
      let chunks = expo.chunkPushNotifications(messages);
      let tickets = [];
      (async () => {
        for (let chunk of chunks) {
          try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
          } catch (error) {
            console.error(error);
          }
        }
      })();
    })
}
