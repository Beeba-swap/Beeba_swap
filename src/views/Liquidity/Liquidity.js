import React, {useState} from "react";
import Select_liquidity from "../component/liquidity.js";
import beeba from "../../abi/token_beeba.json";
import mistersigz from "../../abi/token_mistersigz.json";

import {useEthers} from "@usedapp/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import exchange_beeba from "../../abi/exchange_beeba.json";
import exchange_mistersigz from "../../abi/exchange_mistersigz.json";
import "../../css/liquidity.css";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons";


// call web3
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);
const Liquidity = () =>{


    let { account } = useEthers();
    // balancecall check balance all wallet
    const balancecall = () => {
        // check account (have account?)
        if(window.ethereum){
            contract_exchange_beeba.methods.balanceofether().call((err,result) => {
                if(result){setsupply_ethbee(web3.utils.fromWei(result.toString(),"ether"));}
            });
            contract_exchange_beeba.methods.balanceOftoken().call((err,result) => {
                if(result){setsupply_bee(web3.utils.fromWei(result.toString(),"ether"));}
            });
            contract_exchange_mistersigz.methods.balanceofether().call((err,result) => {
                if(result){setsupply_ethsigz(web3.utils.fromWei(result.toString(),"ether"));}
            });
            contract_exchange_mistersigz.methods.balanceOftoken().call((err,result)=>{
                if(result){setsupply_sigz(web3.utils.fromWei(result.toString(),"ether"));}
            });
        }
    }
    // import contract
    const contract_exchange_beeba = new web3.eth.Contract(exchange_beeba.abi,exchange_beeba.address);
    const contract_exchange_mistersigz = new web3.eth.Contract(exchange_mistersigz.abi,exchange_mistersigz.address);


    var [supply_ethbee,setsupply_ethbee] = useState(parseFloat(0,10));
    var [supply_ethsigz,setsupply_ethsigz] = useState(parseFloat(0,10));
    var [supply_bee,setsupply_bee] = useState(parseFloat(0,10));
    var [supply_sigz,setsupply_sigz] = useState(parseFloat(0,10));
    balancecall()
        return(
            <div>
                { (account == beeba.owner&&<Select_liquidity/>) || (account == mistersigz.owner&&<Select_liquidity/>)}
                <div className="Exchange-together">
                    <div className="Eth-Bee">
                        <img src={"./image/Ethereum-token.png"}/>
                        <FontAwesomeIcon icon="handshake" className={"co-op"}/>
                        <img src={"./image/Beeba-token.png"}/>
                        <div className="Supply-call">
                            <h4>Supply Eth <FontAwesomeIcon icon="coins" className={"coin"}/></h4>
                            <p>{supply_ethbee}</p>
                        </div>
                        <div className="Supply-call">
                            <h4>Supply Bee <FontAwesomeIcon icon="coins" className={"coin"}/></h4>
                            <p>{supply_bee}</p>
                        </div>
                        <div className="Supply-call">
                            <h4>Rate Eth/Bee <FontAwesomeIcon icon="chart-line" className={"coin"}/></h4>
                            <p>{supply_ethbee/supply_bee}</p>
                        </div>
                        <div className="Supply-call">
                            <a href={"https://rinkeby.etherscan.io/address/0x821Bd7f9e08db4373d75eE224dC6E445c6A145e4"}>
                                <button>
                                    <FontAwesomeIcon icon="arrow-right"/>  <FontAwesomeIcon icon="cube"/>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="Exchange-together">
                    <div className="Eth-Bee">
                        <img src={"./image/Ethereum-token.png"}/>
                        <FontAwesomeIcon icon="handshake" className={"co-op"}/>
                        <img src={"./image/mistersigz-token.png"}/>
                        <div className="Supply-call">
                            <h4>Supply Eth <FontAwesomeIcon icon="coins" className={"coin"}/></h4>
                            <p>{supply_ethsigz}</p>
                        </div>
                        <div className="Supply-call">
                            <h4>Supply Sigz <FontAwesomeIcon icon="coins" className={"coin"}/></h4>
                            <p>{supply_sigz}</p>
                        </div>
                        <div className="Supply-call">
                            <h4>Rate Eth/Sigz <FontAwesomeIcon icon="chart-line" className={"coin"}/></h4>
                            <p>{supply_ethsigz/supply_sigz}</p>
                        </div>
                        <div className="Supply-call">
                            <a href={"https://rinkeby.etherscan.io/address/0xFA1F662308d01b7ea29C80A724B38B18679729d9"}>
                                <button>
                                    <FontAwesomeIcon icon="arrow-right"/>  <FontAwesomeIcon icon="cube"/>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        );

}
export default Liquidity;