import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { wait } from "@testing-library/dom";
import React from "react";
import '../../css/Abouts.css'
const Abouts = () =>{
    return(
        <div className={"About-our"}>
            <div className={"Team"}><h2>Our Team!</h2></div>
            <div className={"Education"}><h2>For Education!</h2></div>
            <div className='left'>
                    <div className='Border'>
                        <div className='profile'>
                            <img src='image/beeba.png'></img>
                        </div>
                        <div>Narodom Yatnimit</div>
                        <div>Full Stack Developer</div>
                    </div>
                    <div className='Border'>
                        <div className='profile'>
                            <img src='image/mistersigz.png'></img>
                        </div>
                        <div>Warat Yenjaiprasert</div>
                        <div>BackEnd && Blockchain Developer </div>
                    </div>
                    <div className='Border'>
                        <div className='profile'>
                            <img src='image/park.jpg'></img>
                        </div>
                        <div>Korawit Moonsarn</div>
                        <div>FrontEnd Developer</div>
                    </div>
                    <div className='Border'>
                        <div className='profile'>
                            <img src='image/195323.jpg'></img>
                        </div>
                        <div>Setthathorn Somrug</div>
                        <div>FrontEnd Developer</div>
                    </div>
                    <div className='Border'>
                        <div className='profile'>
                            <img src='image/nam.jpg'></img>
                        </div>
                        <div>Rinrada Kunjobmueng</div>
                        <div>FrontEnd Developer</div>
                    </div>
                </div>
                <div className='horizon'></div>
                <div className={"right"}>
                    <div className={"explain"}>
                        <h1 className={"header"}><span><FontAwesomeIcon icon="cube"/> </span>Blockchain..!</h1>
                        <p>This project make for to learn about blockchain;<br/>Defult project :</p>
                        <a href='./project_blockchain_beebaswap.pdf'>
                            <button>
                                <FontAwesomeIcon icon="arrow-circle-down"/> Beeba-Blockchain.pdf
                            </button>
                        </a>
                    </div>
                    <h3 className={"usage"}>Usage..!</h3>
                    <div className={"image-usage"}>
                        <img src='image/iconcss.png'></img>
                        <img src='image/icongithub.png'></img>
                        <img src='image/iconinfura2.png'></img>
                    </div>
                    <div className='image-usage'>
                        <img src='image/iconmetamask.png'></img>
                        <img src='image/iconreact.png'></img>
                        <img src='image/iconRemix.png'></img>
                    </div>
                </div>
        </div>
    );
}
export default Abouts