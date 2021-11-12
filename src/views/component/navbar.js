import '../../css/navbar.css';
import { Component, useState } from "react";
import Home from '../Home/Home';
import Viewer from '../Viewer/Viewer';
import Exchange from '../Exchange/Exchange';
import Pools from '../Pools/Pools';
import Abouts from '../Abouts/Abouts';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Wallet from '../component/wallet';

class Navbar extends Component {
    render() {

        return (
            <Router>
                <nav class="navbar-main">
                    <h2>App<img src="../image/beaver_listen_music.png"/> Beebaswap</h2>
                    <FontAwesomeIcon icon ="sun" className ="theme-mode"  />
                    <Wallet class="nav-wallet"/>
                    <div class="dropdown" id="dd">
                        <button class="dropbtn">
                    <FontAwesomeIcon icon ="bars" className ="menu-bars"  /> 
                    </button>
                        <div class="f-border">
                        <div class ="dropdown-content" id="dropdown-c">
                            <ul >
                                <li>
                                    <Link to="/"><FontAwesomeIcon icon ="home" className ="home"  /> Home</Link>
                                </li>
                                <li>
                                    <Link to="/Viewer"><FontAwesomeIcon icon ="user-alt" className ="user"  /> Viewer</Link>
                                </li>
                                <li>
                                    <Link to="/Exchange"><FontAwesomeIcon icon ="dollar-sign" className ="viewer"  /> Exchange</Link>
                                </li>
                                <li>
                                    <Link to="/Pools"><FontAwesomeIcon icon ="store" className ="store"  /> Pools</Link>
                                </li>
                                <li>
                                    <Link to="/Abouts"><FontAwesomeIcon icon ="user-friends" className ="about"  /> Abouts</Link>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Viewer" component={Viewer} />
                    <Route path="/Exchange" component={Exchange} />
                    <Route path="/Pools" component={Pools} />
                    <Route path="/Abouts" component={Abouts} />
                </Switch>
            </Router>
        )
    }
}

export default Navbar;