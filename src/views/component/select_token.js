import React, { Component, useEffect, useState } from "react";
import { useEtherBalance, useEthers, ChainId, useTransactions } from '@usedapp/core';
import "../../css/select_token.css"
import Web3 from "web3";
import beeba from "../../abi/token_beeba.json";
import exchange_beeba from "../../abi/exchange_beeba.json";
import mistersigz from "../../abi/token_mistersigz.json";
import exchange_mistersigz from "../../abi/exchange_mistersigz.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Wallet from '../component/wallet';

const Select_token = () => {
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
        if(window.ethereum){
            if (account) {
                // call balance account (user execute)
                // (web3.utils.fromWei(useEtherBalance(account).toString(),"ether"));
                contract_beeba.methods.balanceOf(account).call((err, result) => {
                    if(result){setaccountbalance_bee(web3.utils.fromWei(result.toString(),"ether")); }
                });
                contract_mistersigz.methods.balanceOf(account).call((err, result) => {
                    if(result){setaccountbalance_sigz(web3.utils.fromWei(result.toString(),"ether"));}
                });
            }
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
    //execute user
    let { account } = useEthers();
    var [accountbalance_eth,setaccountbalance_eth] = useState(useEtherBalance(account))// ethers
    var [accountbalance_bee, setaccountbalance_bee] = useState(parseFloat(0,10)); // beeba
    var [accountbalance_sigz, setaccountbalance_sigz] = useState(parseFloat(0,10)); // mistersigz
    //calculate token


    // console.log(accountbalance_eth + " " + accountbalance_bee + " " + accountbalance_sigz)

    var [supply_eth,setsupply_eth] = useState(parseFloat(0,10));
    var [supply_ethbee,setsupply_ethbee] = useState(parseFloat(0,10));
    var [supply_ethsigz,setsupply_ethsigz] = useState(parseFloat(0,10));
    var [supply_bee,setsupply_bee] = useState(parseFloat(0,10));
    var [supply_sigz,setsupply_sigz] = useState(parseFloat(0,10));


    let [tokenA, settokenA] = useState(0); //--> input token on swap
    let [tokenB, settokenB] = useState(0); //--> input token on swap

    var [__token,set_token] = useState(0);
    var [___token,set___token] = useState(0);
    var [__token__,set__token__] = useState(0);
    var [status_exchange,setstatus_exchange] = useState("Submit");
     const swap_exchange = async transaction => {
        if(account && tokenA > 0){
            __token = web3.utils.toWei(tokenA.toString(),"ether") ;
            ___token = calcexchange(tokenA);
            __token__ =calceth(tokenA);
            //to Wei
            ___token = web3.utils.toWei(___token.toString(),"ether");
            __token__ = web3.utils.toWei(__token__.toString(),"ether");
            switch (selected_tokenA){
                case 1 :
                    //buy token by eth;
                    if(selected_tokenB == 2 && parseFloat(calcexchange(tokenA),10) < parseFloat(supply_bee,10)){
                        await contract_exchange_beeba.methods.buytoken(___token).send({from:account,value:__token});
                    }
                    else {alert("High token to exchange!")}
                    if(selected_tokenB == 3 && parseFloat(calcexchange(tokenA),10) < parseFloat(supply_sigz,10)){
                        await contract_exchange_mistersigz.methods.buytoken(___token).send({from:account,value:__token});
                    }
                    else {alert("High token to exchange!")}

                    // console.log("buy token by eth case 1");
                    break;
                case 2 :
                    //sell token
                    if(selected_tokenB == 1 && parseFloat(calcexchange(tokenA),10) < parseFloat( supply_ethbee,10)){
                        await contract_exchange_beeba.methods.Approve(__token).send({from:account}) ;
                        await contract_exchange_beeba.methods.selltoken(__token,___token).send({from:account});
                    }
                    else {alert("High token to exchange!")}

                    if(selected_tokenB == 3 && calcexchange(tokenA) < supply_sigz){
                        await contract_exchange_beeba.methods.Approve(__token).send({from:account});
                        await contract_mistersigz.methods.approvefrom(exchange_mistersigz.address,exchange_beeba.address,___token).send({from:account});
                        await contract_exchange_beeba.methods.swaptoken(
                            exchange_mistersigz.address,
                            mistersigz.address,
                            ___token,
                            __token,
                            __token__
                        ).send({from:account});
                    }
                    else {alert("High token to exchange!")}

                    // console.log("sell&swap token by case 2");
                    break;
                case 3 :
                    //sell token
                    if(selected_tokenB == 1 && parseFloat(calcexchange(tokenA),10) < parseFloat(supply_ethsigz,10)){
                        await contract_exchange_mistersigz.methods.Approve(__token).send({from:account});
                        await contract_exchange_mistersigz.methods.selltoken(__token,___token).send({from:account});
                    }
                    else {alert("High token to exchange!")}

                    // console.log(calcexchange(tokenA)+" "+supply_bee)
                    if(selected_tokenB == 2 && parseFloat(calcexchange(tokenA),10) < parseFloat(supply_bee,10)){
                        await contract_exchange_mistersigz.methods.Approve(__token).send({from:account});
                        await contract_beeba.methods.approvefrom(exchange_beeba.address,exchange_mistersigz.address,___token).send({from:account});
                        await contract_exchange_mistersigz.methods.swaptoken(
                                exchange_beeba.address,
                                beeba.address,
                                ___token,
                                __token,
                                __token__
                              ).send({from:account});
                    }
                    else {alert("High token to exchange!")}

                    // console.log("sell&swap token by case 3");
                    break;
                default : console.log("try again") ;
            }
            // console.log(__token + " " + ___token + " " + __token__)
        }
    }
    //calculate rate token
    const calceth = (input_token) => {
        var supplyA,supplyB ;
        switch (selected_tokenA){
            case 2:
                supplyA = supply_bee ;
                supplyB = supply_ethbee;
                break;
            case 3:
                supplyA = supply_sigz ;
                supplyB = supply_ethsigz;
                break ;
            default:supplyA=1;supplyB=1 ;
        }
        return ((supplyB/supplyA) * input_token).toPrecision(14);
    }
    const calcexchange = (input_token) => {
        // console.log(supply_ethsigz + " " + supply_sigz + "\n"+
        //     supply_ethbee + " " + supply_bee
        // );
        var supplyA,supplyB ;
        switch (selected_tokenA){
            case 1: supplyA = supply_eth;break;
            case 2: supplyA = supply_bee;break;
            case 3 : supplyA = supply_sigz;break;
            default:supplyA=1;
        }
        switch (selected_tokenB){
            case 1 : supplyB = supply_eth ; break;
            case 2 : supplyB = supply_bee ; break;
            case 3 : supplyB = supply_sigz; break;
            default:supplyB=1;
        }
        if(selected_tokenA == 2 && selected_tokenB == 1){
            supplyB = supply_ethbee ;
        }
        if(selected_tokenA == 3 && selected_tokenB == 1){
            supplyB = supply_ethsigz ;
        }
        if(selected_tokenB == 2 && selected_tokenA == 1){
            supplyA = supply_ethbee ;
        }
        if(selected_tokenB == 3 && selected_tokenA == 1){
            supplyA = supply_ethsigz ;
        }
        if(selected_tokenA != 1 && selected_tokenB != 1){
            switch (selected_tokenA){
                case 2: supplyA = supply_bee/supply_ethbee;break;
                case 3 : supplyA = supply_sigz/supply_ethsigz;break;
                default:supplyA=1;
            }
            switch (selected_tokenB){
                case 2 : supplyB = supply_bee/supply_ethbee ; break;
                case 3 : supplyB = supply_sigz/supply_ethsigz; break;
                default:supplyB=1;
            }
        }
        // console.log((supplyB/supplyA) * input_token)
        return ((supplyB/supplyA) * input_token).toPrecision(14);
    }
    //--------------------------------------------------------------
    // Select token
    //--------------------------------------------------------------
    // select option ethereum = 1 , beeba = 2 , mistersigz = 3
    var [selected_tokenA, setselected_tokenA] = useState(1);
    var [selected_tokenB, setselected_tokenB] = useState(0);
    var select_default = "select token..";

    // image token
    let img_ethereum = "../image/ethereum.png";
    let img_beeba = "../image/beeba.png";
    let img_mistersigz = "../image/mistersigz.png";
    let img_default = "../image/fox.png";
    // select function
    const select_token = (_tokenA, _tokenB) => {
        setselected_tokenA(_tokenA);
        setselected_tokenB(_tokenB);
    }
    const selection_tokenA = () => {
        switch (selected_tokenA) {
            case 1: return token_ether();
            case 2: return token_beeba();
            case 3: return token_mistersigz();
            default: return select_default;
        }
    }
    const selection_tokenB = () => {
        switch (selected_tokenB) {
            case 1: return token_ether();
            case 2: return token_beeba();
            case 3: return token_mistersigz();
            default: return select_default;
        }
    }
    const selected_img = (selected_token) => {
        switch (selected_token) {
            case 1: return img_ethereum;
            case 2: return img_beeba;
            case 3: return img_mistersigz;
            default: return img_default;
        }
    }
    const token_name = (_token) => {
        switch (_token) {
            case 1: return " Eth";
            case 2: return " Bee";
            case 3: return " Sigz";
            case 0: return " Select a token";
        }
    }
    //--------------------------------------------------------------
    // Swap token
    //--------------------------------------------------------------
    const swap_token = () => {
        var temp = selected_tokenA;
        setselected_tokenA(selected_tokenB);
        setselected_tokenB(temp);
    }
    //--------------------------------------------------------------
    // token selected
    //--------------------------------------------------------------
    const token_ether = () => {
        return (
            <span class="first-input">
                {selected_tokenA == 1 && <input type={"number"} value={tokenA} onChange={e => {if(e.target.value <= 10**9){settokenA(e.target.value)}}}  />}
                {selected_tokenB == 1 && <input type={"number"} value={calcexchange(tokenA)} onChange={e => settokenB(e.target.value)}  />}
            </span>
        );
    }
    const token_beeba = () => {
        return (
            <span>
                {selected_tokenA == 2 && <input type={"number"} value={tokenA} onChange={e => {if(e.target.value <= 10**9){settokenA(e.target.value)}}} />}
                {selected_tokenB == 2 && <input type={"number"} value={calcexchange(tokenA)} />}
            </span>
        );
    }
    const token_mistersigz = () => {
        return (
            <span>
                {selected_tokenA == 3 && <input type={"number"} value={tokenA} onChange={e => {if(e.target.value <= 10**9){settokenA(e.target.value)}}} />}
                {selected_tokenB == 3 && <input type={"number"} value={calcexchange(tokenA)} />}
            </span>
        );
    }

    balancecall();
    return (
        <div>
             <div className="swap-box">
                <article>
                    <h3><FontAwesomeIcon icon="dollar-sign" className="dollar-sign" />Exchange</h3>
                    <p>Trade token is an instance</p>
                    <hr></hr>
                </article>
                <div className="box">
                    <div class="from"><label>From</label></div>
                        <div class="input-swap">
                        {selection_tokenA()}
                        <a href="#select tokenA" >
                            <button className="button">
                                <img src={selected_img(selected_tokenA)} />
                                {token_name(selected_tokenA)}
                            </button>
                        </a>
                    </div>
                </div>

                <div> <button class="swap" onClick={swap_token}><FontAwesomeIcon icon="arrow-down" className="arrow-down" /></button></div>

                <div className="box">
                    <div><label>To</label></div>
                    <a href="#select tokenB" >
                        {selection_tokenB()}
                        <button className="button" >
                            <img src={selected_img(selected_tokenB)} />
                            {token_name(selected_tokenB)}
                        </button>
                    </a>
                </div>
                <div id="select tokenA" className="overlay">
                    <div className="popup">
                        <a className="close" href="#">&times;</a>
                        <div className="content">
                            {selected_tokenB != 1 && <div><input type={"image"} src={img_ethereum} onClick={e => select_token(1, selected_tokenB)} /></div>}
                            {selected_tokenB != 2 && <div><input type={"image"} src={img_beeba} onClick={e => select_token(2, selected_tokenB)} /></div>}
                            {selected_tokenB != 3 && <div><input type={"image"} src={img_mistersigz} onClick={e => select_token(3, selected_tokenB)} /></div>}
                        </div>
                    </div>
                </div>
                <div id="select tokenB" className="overlay">
                    <div className="popup">
                        <a className="close" href="#">&times;</a>
                        <div className="content">
                            {selected_tokenA != 1 && <div><input type={"image"} src={img_ethereum} onClick={e => select_token(selected_tokenA, 1)} /></div>}
                            {selected_tokenA != 2 && <div><input type={"image"} src={img_beeba} onClick={e => select_token(selected_tokenA, 2)} /></div>}
                            {selected_tokenA != 3 && <div><input type={"image"} src={img_mistersigz} onClick={e => select_token(selected_tokenA, 3)} /></div>}
                        </div>
                    </div>
                </div>
                <div className="exchange-swap">
                    {!account &&<Wallet/>}
                    {account && <input type={"submit"} value={status_exchange} onClick={swap_exchange}/>}
                </div>
             </div>
        </div>
    );
}
export default Select_token;