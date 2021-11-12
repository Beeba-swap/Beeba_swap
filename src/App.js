import './App.css';
import { Component } from "react";
import Navbar from './views/component/navbar.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars, faSun,
    faSignInAlt,
    faSignOutAlt, faHome, 
    faUserAlt, 
    faDollarSign, 
    faStore, 
    faUserFriends,faUsers, faChartBar
} from '@fortawesome/free-solid-svg-icons';
import Wallet from './views/component/wallet';

library.add(faBars, faSun, faSignInAlt, faSignOutAlt, faHome, faUserAlt, faDollarSign, faStore, faUserFriends,faUsers,faChartBar)

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />

            </div>
        );
    }
}


export default App;
