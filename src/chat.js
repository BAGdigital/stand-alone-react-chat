'use strict';
console.log('window', window);
const e = React.createElement;
const App = (props) => {

    return <div>
        <Button />
    </div>
}
// window.ReactBootstrap
const Button = (props) => {
    const [open, setOpen] = React.useState(false);
    const [roomNo, setRoomNo] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [socket, setSocket] = React.useState(null);
    const [curmsg, setCurmsg] = React.useState('');
    const [uname, setUname] = React.useState('');
    const connectRoom = () => {
        // create a new socket connection using websocket
        const chatSocket = new WebSocket(
            'ws://'
            + 'winsor.in:8000'
            + '/ws/chat/'
            + roomNo
            + '/'
        );
        // set the socket to the state
        setSocket(chatSocket);
    }

    React.useEffect(() => {
        if (socket) {
            socket.onmessage = function (e) {
                const data = JSON.parse(e.data);
                console.log(data);
                document.getElementById("chat-log").innerHTML += data.message + '<br/>';
                setMessages(old => {
                    console.log(old)
                    old.push(data)
                    return old;
                })
            };
        }
    }, [socket]);

    return (
        <div>
            <button className="Chatbtn" onClick={() => { setOpen(!open) }}><i className="fas fa-comment-alt"></i></button>
            <div className={`chatwindow ${open ? '' : "hide"}`} >
                <div className="chatWindow-header">
                    Chat Header
                    <div id="chat-log"></div>
                    {/* {messages.map((m, index) => {
                        return <div key={index}>{m.message}</div>
                    })} */}
                    {
                        socket ? <div>
                            <input value={curmsg}
                                onChange={e => {
                                    setCurmsg(e.target.value)
                                }}
                            />
                            <button
                                onClick={() => {
                                    socket.send(JSON.stringify({
                                        'username': uname,
                                        'message': curmsg
                                    }))
                                    setCurmsg('')
                                }}
                            >
                                send
                            </button>
                        </div> : <div>
                            <input
                                placeholder="user name"
                                value={uname}
                                onChange={(e) => setUname(e.target.value)}
                            />
                            <input
                                value={roomNo}
                                onChange={(e) => setRoomNo(e.target.value)}
                            />
                            <button onClick={connectRoom} >Go</button>
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}

const domContainer = document.querySelector('.chatbox');
const key = domContainer.dataset.key
ReactDOM.render(<App />, domContainer);