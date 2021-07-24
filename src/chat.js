'use strict';

const e = React.createElement;
const App = (props) => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        console.log(props)
    }, [])
    return <div>
        <h1>{count}</h1>
        <Button setCount={setCount} />
        <p>My Key : {key}</p>
    </div>
}
const Button = (props) => {
    return (
        <button onClick={() => props.setCount((count) => count + 1)} >Click me</button>
    )
}

const domContainer = document.querySelector('.chatbox');
const key = domContainer.dataset.key
ReactDOM.render(<App />, domContainer);