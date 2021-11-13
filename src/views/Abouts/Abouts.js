import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { wait } from "@testing-library/dom";
import React from "react";
import '../../css/Abouts.css'
const Abouts = () =>{
    return(
        <div>
            <div class = 'f3'>
                <div class = 'left'>
                    <div class = 'font'>Ourteam!</div>
                        <div class = 'f1'>
                                    <div class = 'Border'>
                                        <div class = 'profile'>
                                            <img src = 'image/Beaver.png'></img>
                                        </div>
                                        <div>Narodom Yatnimit</div>
                                        <div>System Analyst</div>
                                    </div>
                                    <div class = 'Border'>
                                        <div class = 'profile'>
                                            <img src = 'image/Beaver.png'></img>
                                        </div>
                                        <div>Warat Yenjaiprasert</div>
                                        <div>Developer BackEnd</div>
                                    </div>
                            </div>
                            <div class = 'f2'>
                                    <div class = 'Border'>
                                        <div class = 'profile'>
                                            <img src = 'image/Beaver.png'></img>
                                        </div>
                                        <div>Korawit Moonsarn</div>
                                        <div>System Analyst</div>
                                    </div>
                                    <div class = 'Border'>
                                        <div class = 'profile'>
                                            <img src = 'image/Beaver.png'></img>
                                        </div>
                                        <div>Korawit Moonsarn</div>
                                        <div>System Analyst</div>
                                    </div>
                                    <div class = 'Border'>
                                        <div class = 'profile'>
                                            <img src = 'image/Beaver.png'></img>
                                        </div>
                                        <div>Korawit Moonsarn</div>
                                        <div>System Analyst</div>
                        </div>
                    </div>
                </div>
                <div class = 'border'></div>
                <div>
                    <div class = 'center'>
                        <div class = 'header'>
                            For Education!!
                        </div>
                    </div>
                    <div class = 'txt'>
                        <div> 
                            This project make for to learn about blockchain;
                        </div>
                        <div> 
                            Defult project :
                        </div>
                    </div>
                    <div class = 'center'>
                        <div class='button_about'>
                        <a href = './Doc1.docx'> <FontAwesomeIcon icon ="arrow-circle-down"/> Beeba-Blockchain.docx</a>
                        </div>
                    </div>
                    <div class = 'center'>
                        <div class = 'header'>
                            Usage
                        </div>
                    </div>
                    <div class = 'center'>
                        <div class = 'image'>
                            <img src = 'image/iconcss.png'></img>
                            <img src = 'image/icongithub.png'></img>
                            <img src = 'image/iconinfura2.png'></img>
                            
                        </div>
                        <div class = 'image'>
                            <img src = 'image/iconmetamask.png'></img>
                            <img src = 'image/iconreact.png'></img>
                            <img src = 'image/iconRemix.png'></img>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}
export default Abouts