import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import  { requestPermission } from  './Notification/Notification';

class Footer extends Component {
    state = {
        isNotify: true
    }

    componentDidMount() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
              .then(swreg => {
                return swreg.pushManager.getSubscription();
              }).then(sub => {
                if (sub === null) {
                    this.setState({isNotify: false})
                }
              })
        }
    }

    askPermissionHandler = ()  => {
        requestPermission().then(() => {
         this.setState({isNotify: true})
        })
     };

   render() {
    let checkNotify = null;

    if (!this.state.isNotify) {
        checkNotify = (
         <div className="site-footer__notify">
            <div 
                className="site-footer__notify--enable"
                onClick={this.askPermissionHandler}>
                     <FontAwesomeIcon 
                icon={['fas', 'bell']} 
                className="icon icon__site-footer--notify" />
                Enable Notification
            </div>
        </div>
        )
     }

    return (
        <footer className="site-footer">
            { checkNotify }
            <ul>
                <li><a href="/term">Term of service</a></li>
                <li>&copy; Slodge24 , 2020</li>
                <li><a href="/privacy">Privacy policy</a></li>
            </ul>
        </footer>
    )
   }
}


export default Footer;