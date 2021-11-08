import './App.css';
import {Component} from "react";
import Navbar from './views/component/navbar.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars,faSun,faSignInAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faBars,faSun,faSignInAlt)

class App extends Component{
    render() {
        return(
            <Navbar />
            
        );
    }
}


export default App;
