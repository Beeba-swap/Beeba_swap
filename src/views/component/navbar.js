import '../../css/navbar.css';
import { Component, useState } from "react";
import Home from '../Home/Home';
import Viewer from '../Viewer/Viewer';
import Exchange from '../Exchange/Exchange';
import Liqiudtity from  '../Liquidity/Liquidity.js';
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
                    <Wallet/>

                    <div class="dropdown">
                        <button className="dropdown-button">
                            <FontAwesomeIcon icon="list-ul" className="menu-bars"/>
                        </button>
                        <div className="block"></div>
                        <div className="dropdown-content" id="dropdown-c">
                            <div className="dropdown-menu">
                                <ul>
                                    <li>
                                        <Link to="/">
                                        <button>
                                            <FontAwesomeIcon icon="home" className="icon"/>Home
                                        </button>
                                        </Link>
                                    </li>
                                    <li><hr/></li>
                                    <li>
                                        <Link to="/Viewer">
                                            <button>
                                                <FontAwesomeIcon icon="user-alt" className="icon"/> Viewer
                                            </button>
                                        </Link>
                                    </li>
                                    <li><hr/></li>
                                    <li>
                                        <Link to="/Exchange">
                                            <button>
                                                <FontAwesomeIcon icon="dollar-sign" className="icon"/> Exchange
                                            </button>
                                        </Link>
                                    </li>
                                    <li><hr/></li>
                                    <li>
                                        <Link to="/Liqiudtity">
                                            <button>
                                                <FontAwesomeIcon icon="store" className="icon"/> Liquidity
                                            </button>
                                        </Link>
                                    </li>
                                    <li><hr/></li>

                                    <li>
                                        <Link to="/Abouts">
                                            <button>
                                                <FontAwesomeIcon icon="user-friends" className="icon"/> Abouts
                                            </button>
                                        </Link>
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
                    <Route path="/Liqiudtity" component={Liqiudtity} />
                    <Route path="/Abouts" component={Abouts} />
                </Switch>
            </Router>
        )
    }
}

export default Navbar;