import React, { Component } from 'react';
import Moment from 'react-moment';
import * as Localization from 'expo-localization';
import 'moment/locale/bn';
import 'moment/locale/ca';
import 'moment/locale/zh-cn';
import 'moment/locale/da';
import 'moment/locale/nl';
import 'moment/locale/eo';
import 'moment/locale/et';
import 'moment/locale/fi';
import 'moment/locale/fr';
import 'moment/locale/de';
import 'moment/locale/hi';
import 'moment/locale/id';
import 'moment/locale/ga';
import 'moment/locale/it';
import 'moment/locale/ja';
import 'moment/locale/jv';
import 'moment/locale/ko';
import 'moment/locale/ms';
import 'moment/locale/pa-in';
import 'moment/locale/ru';
import 'moment/locale/es';
import 'moment/locale/sv';
import 'moment/locale/th';
import 'moment/locale/tr';
import 'moment/locale/vi';

class LocaleMoment extends Component {
    render() {
        let updateLocale = Localization.locale.split('-')[0];
        Moment.globalLocale = updateLocale;
        return <Moment {...this.props}/>
    }
}

export default LocaleMoment;