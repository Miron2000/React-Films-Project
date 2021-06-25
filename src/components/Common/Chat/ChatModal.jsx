import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import TextField from "@material-ui/core/TextField";
import './Chat.css';

const ChatModal = ({active, setActive, chatArr = []}) => {

    const socket = io.connect('http://localhost:3000');
    const [state, setState] = useState({message: '', name: ''});
    const [chat, setChat] = useState(chatArr);
    console.log(chat, 'chatModal')

    // useEffect(() => {
    //      this.root = document.createElement('div');
    //     document.body.appendChild(this.root);
    // },[])
    //
    // useEffect(() => {
    //     document.body.removeChild(this.root);
    // },[])

    useEffect( () => {
        setChat([...chatArr, ...chat])
    }, [chatArr]);


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

    return ReactDOM.createPortal(
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
                        {renderChat()}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
        // {this.root}
    );
}

export default ChatModal;