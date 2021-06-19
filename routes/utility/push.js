const { user, authUser} = require('../../serverDB/serverDB');
const webpush = require('web-push');
const {  Expo } = require('expo-server-sdk');

module.exports = push = (shareMe, content, field, id) => {
    return new Promise((resolve, reject) => {
      let messages = [];
      let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
      for (let pushToken of somePushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          continue;
        }

        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
          to: pushToken,
          sound: 'default',
          body: 'This is a test notification',
          data: { withSome: 'data' },
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
