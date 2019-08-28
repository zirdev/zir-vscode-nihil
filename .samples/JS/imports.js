import { React } from "react";
import { ReactDOM } from 'react-dom';
import App from './components.app';
import * as something from './something.test';
const path = require("path"); // NodeJS test

ReactDOM.render(
    <App/>,
    document.getElementById('app'),
);

something = path("dir")