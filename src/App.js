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
    ,faArrowDown,
    faArrowCircleDown,faDownload,faUser,faListUl,faCube,faNetworkWired,faGasPump,faAngleDown,faRetweet,faArrowAltCircleRight,faHandshake,faCoins,faChartLine,faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import Wallet from './views/component/wallet';

library.add(faBars, faSun, 
    faSignInAlt, faSignOutAlt, faHome, faUserAlt, 
    faDollarSign, faStore, faUserFriends,faUsers,faChartBar,faDollarSign,faArrowDown,faArrowCircleDown,
    faDownload,faUser,faListUl,faCube,faNetworkWired,faGasPump,faAngleDown,faRetweet,faArrowAltCircleRight,faHandshake,faCoins,faChartLine,faArrowRight
)

class App extends Component {
    render() {
        document.title = "Beeba swap";
        return (
            <div class="Main">
                <Navbar />

            </div>
        );
    }
}


export default App;
