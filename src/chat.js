'use strict';
console.log('window', window);
const e = React.createElement;
const App = (props) => {
    return <div>
        <Button />
    </div>
}
const Button = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <button className="Chatbtn" onClick={() => { setOpen(!open) }}><i className="fas fa-comment-alt"></i></button>
            <div className={`chatwindow ${open ? '' : "hide"}`} >
                <div className="chatWindow-header">
                    Chat Header
                </div>
            </div>
        </div>
    )
}

const domContainer = document.querySelector('.chatbox');
const key = domContainer.dataset.key
ReactDOM.render(<App />, domContainer);