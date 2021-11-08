import '../../css/navbar.css';
import { Component } from "react";
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

class Navbar extends Component {
    render() {
        return (
            <Router>
                <nav class="navbar-main">
                    <h2>App<img src="../image/beaver_listen_music.png"/> Beebaswap</h2>
                    <FontAwesomeIcon icon ="sun" className ="theme-mode"  /> 
                    {/* <a class="navbar-brand" href="#">
                    </a>
                    <div class="dropdown">
                        <button class="dropbtn">
                    <FontAwesomeIcon icon ="bars" className ="menu-bars"  /> 
                    </button>
                        <div class="dropdown-content">
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/Viewer">Viewer</Link>
                                </li>
                                <li>
                                    <Link to="/Exchange">Exchange</Link>
                                </li>
                                <li>
                                    <Link to="/Pools">Pools</Link>
                                </li>
                                <li>
                                    <Link to="/Abouts">Abouts</Link>
                                </li>
                            </ul>
                        </div>
                    </div> */}
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