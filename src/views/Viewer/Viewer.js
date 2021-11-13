import React from "react";
import '../../css/viewer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Viewer extends React.Component{
    render(){
        return(
            <div>
                <div class="container-viewer">
                        <article>
                            <h3>Will you join them?</h3>
                            <p2>The website is for educational purposes.not related to commericial. The number are simulated only.</p2>
                        </article>
                        <div class="bottom-box">
                            <div class ="user-count"><FontAwesomeIcon icon ="user-alt" className ="user-c"  />
                            <article>
                            <h4>16 users</h4>
                            <p>in the last 30 days</p>
                            </article>
                            </div>
                            <div class ="viewer-count"><FontAwesomeIcon icon ="users" className ="viewer-c"  />
                            <article>
                            <h4>78 Viewers</h4>
                            <p>in the last 30 days</p>
                            </article>
                            </div>
                            <div class ="trade-count" ><FontAwesomeIcon icon ="chart-bar" className ="trade-c"  />
                            <article>
                            <h4>31 trade</h4>
                            <p>made in 7 days</p>
                            </article>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}