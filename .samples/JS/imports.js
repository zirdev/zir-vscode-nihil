import { React } from "react";
import { ReactDOM } from 'react-dom';
import App from './components.app';
import * as something from './something.test';
const path = require("path");

ReactDOM.render(
    <App/>,
    document.getElementById('app'),
);

var getSomething = path("dir", something)
getSomething()

var abracadabra = 5 + 7;