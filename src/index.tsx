import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {store} from './redux/store'
import {Provider} from 'react-redux'

const ReactDOM = require('react-dom');
const rootElement = document.getElementById('root')
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <Provider store={store}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <App />
            </BrowserRouter>
        </Provider>
    );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
