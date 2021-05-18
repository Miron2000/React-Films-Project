import React from 'react';
import '../Footer.css';

const FooterIcon = (props) => {
    return (
        <div className="footer__item">
            <a href={props.link} target="_blank">{props.title} <span className="icon">{props.icon}</span></a>
        </div>
    );
}

export default FooterIcon;