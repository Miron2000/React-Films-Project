import React, {useEffect, useState} from 'react';
import './Chat.css';
import ChatModal from "./ChatModal";
import axios from "axios";

const ChatButton = ({user}) => {
    const [modalActive, setModalActive] = useState();
    const [chats, setChats] = useState('');
    useEffect(() => {
        const apiUrlChat = `http://localhost:3000/chat`;
        axios.get(apiUrlChat).then((response) => {
            const getChats = response.data;
            setChats(getChats)
        });
    }, [setChats])
    console.log(chats, 'chat')

    return (
        <>
        <div>
            <a className="shine-button" onClick={() => setModalActive(true)}>Chat</a>
        </div>
            <ChatModal active={modalActive} setActive={setModalActive} chatArr={chats}/>
        </>
    );
}

export default ChatButton;