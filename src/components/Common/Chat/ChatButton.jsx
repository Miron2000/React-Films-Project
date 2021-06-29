import React, {useEffect, useState} from 'react';
import './Chat.css';
import ChatModal from "./ChatModal";

const ChatButton = ({user}) => {
    const [modalActive, setModalActive] = useState();

    return (
        <>
            <div>
                <a className="shine-button" onClick={() => setModalActive(true)}>Chat</a>
            </div>
            {modalActive && <ChatModal active={modalActive} setActive={setModalActive}/>}

        </>
    );
}

export default ChatButton;