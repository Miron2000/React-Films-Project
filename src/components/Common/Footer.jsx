import React from 'react';
import './Footer.css';
import FooterIcon from "./FooterIcon/Footer-icon";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram, faTelegramPlane, faFacebookF, faTwitter} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

    const icon = {
        instagram: <FontAwesomeIcon icon={faInstagram}/>,
        telegram: <FontAwesomeIcon icon={faTelegramPlane}/>,
        facebook: <FontAwesomeIcon icon={faFacebookF}/>,
        twitter: <FontAwesomeIcon icon={faTwitter}/>
    };
    const link = {
        facebook: 'https://uk-ua.facebook.com/',
        instagram: 'https://www.instagram.com/?hl=ru',
        telegram: 'https://web.telegram.org/#/login',
        twitter: 'https://twitter.com/?lang=ru'
    };

    return (
        <footer className="footer">
            <div className="footer__section">
                <FooterIcon title="Facebook" icon={icon.facebook} link={link.facebook}/>
                <FooterIcon title="Telegram" icon={icon.telegram} link={link.telegram}/>
                <FooterIcon title="Instagram" icon={icon.instagram} link={link.instagram}/>
                <FooterIcon title="Twitter" icon={icon.twitter} link={link.twitter}/>
            </div>
        </footer>
    );
}

export default Footer;
