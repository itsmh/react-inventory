import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const template = (<div className="container">
    <div className="row justify-content-md-center">
        <div className="">
            <App />
        </div>
    </div>
</div>)


ReactDOM.render(template, document.getElementById('root'));
registerServiceWorker();
