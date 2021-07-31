'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

console.log('window', window);
var e = React.createElement;
var App = function App(props) {

    return React.createElement(
        'div',
        null,
        React.createElement(Button, null)
    );
};
// window.ReactBootstrap
var Button = function Button(props) {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        open = _React$useState2[0],
        setOpen = _React$useState2[1];

    var _React$useState3 = React.useState(''),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        roomNo = _React$useState4[0],
        setRoomNo = _React$useState4[1];

    var _React$useState5 = React.useState([]),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        messages = _React$useState6[0],
        setMessages = _React$useState6[1];

    var _React$useState7 = React.useState(null),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        socket = _React$useState8[0],
        setSocket = _React$useState8[1];

    var _React$useState9 = React.useState(''),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        curmsg = _React$useState10[0],
        setCurmsg = _React$useState10[1];

    var _React$useState11 = React.useState(''),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        uname = _React$useState12[0],
        setUname = _React$useState12[1];

    var connectRoom = function connectRoom() {
        // create a new socket connection using websocket
        var chatSocket = new WebSocket('ws://' + 'winsor.in:8000' + '/ws/chat/' + roomNo + '/');
        // set the socket to the state
        setSocket(chatSocket);
    };

    React.useEffect(function () {
        if (socket) {
            socket.onmessage = function (e) {
                var data = JSON.parse(e.data);
                console.log(data);
                document.getElementById("chat-log").innerHTML += data.message + '<br/>';
                setMessages(function (old) {
                    console.log(old);
                    old.push(data);
                    return old;
                });
            };
        }
    }, [socket]);

    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { className: 'Chatbtn', onClick: function onClick() {
                    setOpen(!open);
                } },
            React.createElement('i', { className: 'fas fa-comment-alt' })
        ),
        React.createElement(
            'div',
            { className: 'chatwindow ' + (open ? '' : "hide") },
            React.createElement(
                'div',
                { className: 'chatWindow-header' },
                'Chat Header',
                React.createElement('div', { id: 'chat-log' }),
                socket ? React.createElement(
                    'div',
                    null,
                    React.createElement('input', { value: curmsg,
                        onChange: function onChange(e) {
                            setCurmsg(e.target.value);
                        }
                    }),
                    React.createElement(
                        'button',
                        {
                            onClick: function onClick() {
                                socket.send(JSON.stringify({
                                    'username': uname,
                                    'message': curmsg
                                }));
                                setCurmsg('');
                            }
                        },
                        'send'
                    )
                ) : React.createElement(
                    'div',
                    null,
                    React.createElement('input', {
                        placeholder: 'user name',
                        value: uname,
                        onChange: function onChange(e) {
                            return setUname(e.target.value);
                        }
                    }),
                    React.createElement('input', {
                        value: roomNo,
                        onChange: function onChange(e) {
                            return setRoomNo(e.target.value);
                        }
                    }),
                    React.createElement(
                        'button',
                        { onClick: connectRoom },
                        'Go'
                    )
                )
            )
        )
    );
};

var domContainer = document.querySelector('.chatbox');
var key = domContainer.dataset.key;
ReactDOM.render(React.createElement(App, null), domContainer);