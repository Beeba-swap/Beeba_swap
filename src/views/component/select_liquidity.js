import React, {Component, useEffect, useState} from "react";
import {useEtherBalance, useEthers, ChainId, useTransactions} from '@usedapp/core';
import "../../css/liquidity.css"
import Web3 from "web3";
import beeba from "../../abi/token_beeba.json";
import exchange_beeba from "../../abi/exchange_beeba.json";
import mistersigz from "../../abi/token_mistersigz.json";
import exchange_mistersigz from "../../abi/exchange_mistersigz.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Select_liquidity = () => {
    //--------------------------------------------------------------
    // Set variable,value
    //--------------------------------------------------------------
    // call web3
    const Web3 = require("web3");
    const web3 = new Web3(Web3.givenProvider);
    // const web3 = new Web3(Web3.givenProvider||'ws://some.local-or-remote.node:8546');
    // const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
    // const web3 = new Web3(rpcURL);

    // import contract
    const contract_beeba = new web3.eth.Contract(beeba.abi, beeba.address);
    const contract_mistersigz = new web3.eth.Contract(mistersigz.abi, mistersigz.address);
    const contract_exchange_beeba = new web3.eth.Contract(exchange_beeba.abi,exchange_beeba.address);
    const contract_exchange_mistersigz = new web3.eth.Contract(exchange_mistersigz.abi,exchange_mistersigz.address);
    // balancecall check balance all wallet
    const balancecall = () => {
        // check account (have account?)
        if (account) {
            // call balance account (user execute)
            // (web3.utils.fromWei(useEtherBalance(account).toString(),"ether"));
            contract_beeba.methods.balanceOf(account).call((err, result) => { setaccountbalance_bee(web3.utils.fromWei(result.toString(),"ether")) });
            contract_mistersigz.methods.balanceOf(account).call((err, result) => { setaccountbalance_sigz(web3.utils.fromWei(result.toString(),"ether")) });
        }
        if(account == beeba.owner){
            contract_exchange_beeba.methods.balanceofether().call((err,result)=>{ setsupplyA(web3.utils.fromWei(result.toString(),"ether"))});
            contract_exchange_beeba.methods.balanceOftoken().call((err,result)=>{ setsupplyB(web3.utils.fromWei(result.toString(),"ether"))});
        }
        if(account == mistersigz.owner){
            contract_exchange_mistersigz.methods.balanceofether().call((err,result)=>{ setsupplyA(web3.utils.fromWei(result.toString(),"ether"))});
            contract_exchange_mistersigz.methods.balanceOftoken().call((err,result)=>{ setsupplyB(web3.utils.fromWei(result.toString(),"ether"))});
        }
    }
    //execute user
    let { account } = useEthers();
    let [accountbalance_eth,setaccountbalance_eth] = useState(useEtherBalance(account));
    let [accountbalance_bee,setaccountbalance_bee] = useState(0);
    let [accountbalance_sigz,setaccountbalance_sigz] = useState(0);

    let [tokenA, settokenA] = useState(0); //--> input token on swap
    let [tokenB, settokenB] = useState(0); //--> input token on swap
    let [supplyA,setsupplyA] = useState(0);
    let [supplyB,setsupplyB] = useState(0);


    // image token
    let img_ethereum = "./image/Ethereum-token.png";
    let img_beeba = "./image/Beeba-token.png";
    let img_mistersigz = "./image/mistersigz-token.png";
    let img_default = "./image/default-token.png";

    const Add_liquidity = async deposit => {
        var _token = web3.utils.toWei(tokenA.toString(),"ether");
        var __token = web3.utils.toWei(tokenB.toString(),"ether");
        if(account == beeba.owner){
            await contract_beeba.methods.approve(exchange_beeba.address,__token).send({from:account});
            await contract_exchange_beeba.methods.deposit(__token).send({from:account,value:_token});
        }
        if(account == mistersigz.owner){
            await contract_mistersigz.methods.approve(exchange_mistersigz.address,__token).send({from:account});
            await contract_exchange_mistersigz.methods.deposit(__token).send({from:account,value:_token});
        }
    }
    const Withdraw_liquidity = async withdraw => {
        if(account == beeba.owner){
            await contract_exchange_beeba.methods.withdraw().send({from:account});
        }
        if(account == mistersigz.owner){
            await contract_exchange_mistersigz.methods.withdraw().send({from:account});
        }
    }

    balancecall();
    return (
        <div>
            <div className="swap-box">
                <article>
                    <h3><FontAwesomeIcon icon="dollar-sign" className="dollar-sign"/>Liquidity</h3>
                    <p>invest with us just deposit with us</p>
                    <hr/>
                </article>
                <div className={"input-liquidity"}>
                    <input value={tokenA} onChange={e => {if(e.target.value <= 10**9){settokenA(e.target.value)}}}/>
                    <img src={img_ethereum}/>
                </div>
                <div className={"to-add"}>
                    <button className="swap"><FontAwesomeIcon icon="retweet"/></button>
                </div>
                <div className={"input-liquidity"}>
                    <input value={tokenB} onChange={e => {if(e.target.value <= 10**9){settokenB(e.target.value)}}}/>
                    {account == beeba.owner && <img src={img_beeba}/>}
                    {account == mistersigz.owner && <img src={img_mistersigz}/>}
                </div>

                <div className={"submit-liquidity"}>
                    <input type={"submit"} value={"Add liquidity"} onClick={Add_liquidity}/>
                </div>
                <div className={"submit-liquidity"}>
                    <input type={"submit"} value={"Withdraw"} onClick={Withdraw_liquidity}/>
                </div>
            </div>
        </div>
    );
}
export default Select_liquidity;