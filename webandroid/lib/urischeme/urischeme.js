import { Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

const uriScheme = (type, content) => {
    let scheme = {
        Email: `mailto: ${content}`,
        'E-mail': `mailto: ${content}`,
        Call: `tel:${content}`,
        'Phone Number': `tel:${content}`,
        Message: `sms:${content}`,
        Sms: `sms:${content}`,
        URL: content,
        Geo: `geo:${content}`,
        Slodge24: `slodge24://${content}`
    }
    for (let key in scheme) {
        if (key === type) {
            if (key !== 'URL') {
                Linking.openURL(scheme[key])
            } else {
                (async () => {
                    try {
                      const url = scheme[key];
                      if (await InAppBrowser.isAvailable()) {
                        const result = await InAppBrowser.open(url, {
                          preferredBarTintColor: '#453AA4',
                          // Android Properties
                          showTitle: true,
                          toolbarColor: '#6200EE',
                          secondaryToolbarColor: 'black',
                          navigationBarColor: 'black',
                          navigationBarDividerColor: 'white',
                          enableUrlBarHiding: true,
                          enableDefaultShare: true,
                          forceCloseOnRedirection: false
                        })
                      } else {
                        Linking.openURL(url)
                      }
                    } catch (error) {
                      Linking.openURL(scheme[key])
                    }
                })();
            }
            
        }
    }
}

export default uriScheme;