import React, { Component } from 'react';
import Moment from 'react-moment';
import * as Localization from 'expo-localization';
import 'moment/locale/fr';
import 'moment/locale/bn';
import 'moment/locale/zh-cn';
import 'moment/locale/nl';
import 'moment/locale/de';
import 'moment/locale/hi';
import 'moment/locale/id';
import 'moment/locale/ja';
import 'moment/locale/ko';
import 'moment/locale/pa-in';
import 'moment/locale/tr';

class LocaleMoment extends Component {
    render() {
        let updateLocale = Localization.locale.split('-')[0];
        Moment.globalLocale = updateLocale;
        return <Moment {...this.props}/>
    }
}

export default LocaleMoment;