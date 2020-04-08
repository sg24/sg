import React, { Component } from 'react';

class Footer extends Component {
   render() {
    return (
        <footer className="site-footer">
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