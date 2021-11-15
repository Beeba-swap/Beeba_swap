import React, {useEffect,useState} from "react";
import abi from "../../abi/test.json";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import detectEthereumProvider from '@metamask/detect-provider'
import Wallet from '../component/wallet'
import Exchange from "../component/exchange";
import '../../css/Home.css'
import '../../css/trade-button.css'
import {Route, Router, Switch} from "react-router-dom";

const Web3 = require('web3');
const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
const web3 = new Web3(rpcURL);
const address =  "0x6D9297ba1ddD7525FF9bdaE492965E8f134518Fa"
const contract = new web3.eth.Contract(abi,address);

function LifecycleDemo() {
    const [a,seta] = useState("")

    useEffect(() => {

        console.log('render!');
        const a = contract.methods.Square(5,2).call((err, result) => { seta(result) });

        return () => console.log('unmounting...');
    }, []);

    return a;
}


 const Home = props =>{
     const { activateBrowserWallet, deactivate, account,chainId} = useEthers()
     const userBalance = useEtherBalance(account)
     function toExchange() {
         props.history.push('/Exchange')
     }
        return(
                <div>
                    <div className="container">
                        <img className="img-responsive" src="image/beavera_paint.png"/>
                        <article>
                            <h2>Beaver on the move</h2>
                            <p>The website is for educational purposes. not related to commerical.The numbers are
                                simulated only.</p>
                        </article>
                        <div className="sl-button">
                            <Wallet class="wallet-home"/>
                            <button className="trade-button" onClick={toExchange}>Trade now</button>
                        </div>
                    </div>
                    {/* <LifecycleDemo/>
            <Exchange /> */}
                </div>
        );

}
export default Home