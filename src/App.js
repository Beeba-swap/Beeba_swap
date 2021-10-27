import './App.css';
import {Component} from "react";
import Home from './views/Home/Home';
import Viewer from './views/Viewer/Viewer';
import Exchange from './views/Exchange/Exchange';
import Pools from './views/Pools/Pools';
import Abouts from './views/Abouts/Abouts';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



class App extends Component{


    render() {
        return(
            <Router>
                <div>
                    <nav>
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
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path ="/" exact component ={Home} />
                        <Route path ="/Viewer" component ={Viewer} />
                        <Route path ="/Exchange" component ={Exchange} />
                        <Route path ="/Pools" component ={Pools} />
                        <Route path ="/Abouts" component ={Abouts} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
