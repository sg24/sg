import { Linking } from 'react-native';

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
            Linking.openURL(scheme[key])
        }
    }
}

export default uriScheme;