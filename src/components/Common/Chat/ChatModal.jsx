import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import TextField from "@material-ui/core/TextField";
import './Chat.css';
import axios from "axios";

const ChatModal = ({active, setActive, chatArr}) => {

    const socket = io.connect('http://localhost:3000');
    const [state, setState] = useState({message: '', name: ''});
    const [chat, setChat] = useState([]);

    // const [chats, setChats] = useState('');
    // useEffect(() => {
    //     const apiUrlChat = `http://localhost:3000/chat`;
    //     axios.get(apiUrlChat).then((response) => {
    //         const getChats = response.data;
    //         setChats(getChats)
    //     });
    // }, [setChats])
    // console.log(chats, 'chat')

    const onTextChange = e => {
        setState({...state, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        socket.on('message', ({name, message}) => {
            setChat([...chat, {name, message}])
        })
    })

    const onMeessageSubmit = (e) => {
        e.preventDefault();
        const {name, message} = state;
        socket.emit('message', {name, message});
        setState({message: '', name})
    }

    const renderChat = () => {
        return chat.map(({name, message}, index) => (
            <div key={index}>
                <h3>{name}: <span>{message}</span></h3>
            </div>
        ))
    }

    const test = () => {
        console.log(chatArr, 'test')
        // return chatArr.map((c) => (
        //     console.log(c, 'test')
        //     // <div key={c.id}>
        //     //     <h3>{c.name}: <span>{c.message}</span></h3>
        //     // </div>
        // ))
    }
    test()


    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                <div className="card">
                    <form onSubmit={onMeessageSubmit}>
                        <h2 className="heading">Messenger</h2>
                        <div className="name-field">
                            <TextField
                                name="name"
                                label="Name"
                                onChange={e => onTextChange(e)}
                                value={state.name}
                            />
                        </div>
                        <div>
                            <TextField
                                name="message"
                                id="outlined-multiline-static"
                                variant="outlined"
                                label="Message"
                                onChange={e => onTextChange(e)}
                                value={state.message}
                            />
                        </div>
                        <button className="btn__send">Send Message</button>
                    </form>
                    <div className="render-chat">
                        <h2 className="heading">Chat Log</h2>
                        {/*{test()}*/}
                        {renderChat()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatModal;