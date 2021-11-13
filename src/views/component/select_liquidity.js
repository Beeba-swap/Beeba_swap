import React, {Component, useEffect, useState} from "react";
import {useEtherBalance, useEthers, ChainId, useTransactions} from '@usedapp/core';
import "../../css/select_token.css"
import Web3 from "web3";
import beeba from "../../abi/token_beeba.json";
import _beeba from "../../abi/liquidity.json";
import mistersigz from "../../abi/token_mistersigz.json";

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
    const contract_beeba = new web3.eth.Contract(beeba.abi,beeba.address);
    const contract_mistersigz = new web3.eth.Contract(mistersigz.abi,mistersigz.address);
    const contract__beeba = new web3.eth.Contract(_beeba.abi,_beeba.address);
    // set provider
    // provider = Mistersigz account
    const provider_address = beeba.owner ;
    var [providerbalance_eth,setproviderbalance_eth] = useState(0);
    var [providerbalance_bee,setproviderbalance_bee] = useState(0);
    var [providerbalance_sigz,setproviderbalance_sigz] = useState(0);

    // balancecall check balance all wallet
    const balancecall = () => {
        // check account (have account?)
        if(account){
            // call balance account (user execute)
            contract_beeba.methods.balanceOf(account).call((err,result) =>{setaccountbalance_bee(result)});
            contract_mistersigz.methods.balanceOf(account).call((err,result) => {setaccountbalance_sigz(result)});
        }
        // call balance provider
        web3.eth.getBalance(provider_address).then(result=>{setproviderbalance_eth(result)});
        contract_beeba.methods.balanceOf(provider_address).call((err,result) =>{setproviderbalance_bee(result)});
        contract_mistersigz.methods.balanceOf(provider_address).call((err,result)=>{setproviderbalance_sigz(result)});
    }

    //execute user
    let  {account} = useEthers();
    var accountbalance_eth = useEtherBalance(account); // ethers
    var [accountbalance_bee,setaccountbalance_bee] = useState(0); // beeba
    var [accountbalance_sigz,setaccountbalance_sigz] = useState(0); // mistersigz
    //calculate token
    let [tokenA, settokenA] = useState(0); //--> input token on swap
    let [tokenB, settokenB] = useState(0); //--> input token on swap

    const liquidity_deposit = (_tokenA,_tokenB) => {
        if(account){
            switch (selected_tokenA){
                case 1:_tokenA = web3.utils.fromWei(accountbalance_eth.toString(),"ether") ;break;
                case 2:_tokenA = web3.utils.fromWei(accountbalance_bee.toString(),"ether") ;break;
                case 3:_tokenA = web3.utils.fromWei(accountbalance_sigz.toString(),"ether") ;break;
                default : _tokenA = 0 ;break;
            }
            switch (selected_tokenB){
                case 1:_tokenB = web3.utils.fromWei(accountbalance_eth.toString(),"ether") ;break;
                case 2:_tokenB = web3.utils.fromWei(accountbalance_bee.toString(),"ether") ;break;
                case 3:_tokenB = web3.utils.fromWei(accountbalance_sigz.toString(),"ether") ;break;
                default : _tokenB = 0 ;break;
            }
            tokenA = parseFloat(tokenA,10);
            tokenB = parseFloat(tokenB,10);
            _tokenA = parseFloat(_tokenA,10);
            _tokenB = parseFloat(_tokenB,10);
            console.log(tokenA + " " + _tokenA);
            if(tokenA < _tokenA && tokenA > 0 ){
                contract_beeba.methods.approve(_beeba.address,web3.utils.toWei(tokenA.toString(),"ether")).send({from:account});
                contract__beeba.methods.deposit(web3.utils.toWei(tokenA.toString(),"ether")).send({from:account});
            }
            else{
                alert("Not enough tokenA..");
            }

            if(tokenB < _tokenB && tokenB != 0){
                contract_beeba.methods.approve(_beeba.address,web3.utils.toWei(tokenB.toString(),"ether")).send({from:account});
                contract__beeba.methods.deposit(web3.utils.toWei(tokenB.toString(),"ether")).send({from:account});
            }
            else{
                alert("Not enough tokenB..");
            }
        }
    }

    const liquidity_withdraw = () => {
        if(account){
            contract__beeba.methods.withdraw().send({from:account});
        }
    }
    //--------------------------------------------------------------
    // Select token
    //--------------------------------------------------------------
    // select option ethereum = 1 , beeba = 2 , mistersigz = 3
    var [selected_tokenA,setselected_tokenA] = useState(1);
    var [selected_tokenB,setselected_tokenB] = useState(0);
    var select_default = "select token";

    // image token
    let img_ethereum = "../image/ethereum.png" ;
    let img_beeba = "../image/beeba.png" ;
    let img_mistersigz = "../image/mistersigz.png";
    let img_default = "../image/fox.png";

    // select function
    const select_token = (_tokenA,_tokenB) => {
        setselected_tokenA(_tokenA);
        setselected_tokenB(_tokenB);
    }
    const selection_tokenA  = () => {
        switch (selected_tokenA){
            case 1 : return token_ether();
            case 2 : return token_beeba();
            case 3 : return token_mistersigz();
            default : return select_default ;
        }
    }
    const selection_tokenB  = () => {
        switch (selected_tokenB){
            case 1 : return token_ether();
            case 2 : return token_beeba();
            case 3 : return token_mistersigz();
            default : return select_default ;
        }
    }
    const selected_img = (selected_token) => {
        switch (selected_token){
            case 1: return img_ethereum;
            case 2: return img_beeba;
            case 3: return img_mistersigz;
            default :return img_default;
        }
    }
    //--------------------------------------------------------------
    // Swap token
    //--------------------------------------------------------------
    const swap_token = () => {
        var temp = selected_tokenA ;
        setselected_tokenA(selected_tokenB);
        setselected_tokenB(temp) ;
    }
    //--------------------------------------------------------------
    // token selected
    //--------------------------------------------------------------
    const token_ether = () => {
        return (
            <div>
                {selected_tokenA == 1 && <input type={"number"} value={tokenA} onChange={e=> settokenA(e.target.value)}/>}
                {selected_tokenB == 1 && <input type={"number"} value={tokenB} onChange={e => settokenB(e.target.value)}/>}
            </div>
        );
    }
    const token_beeba = () => {
        return (
            <div>
                {selected_tokenA == 2 && <input type={"number"} value={tokenA} onChange={e=> settokenA(e.target.value)}/>}
                {selected_tokenB == 2 && <input type={"number"} value={tokenB} onChange={e=> settokenB(e.target.value)} />}
            </div>
        );
    }
    const token_mistersigz = () => {
        return (
            <h1>
                {selected_tokenA == 3 && <input type={"number"} value={tokenA} onChange={e=> settokenA(e.target.value)}/>}
                {selected_tokenB == 3 && <input type={"number"} value={tokenB} onChange={e=> settokenB(e.target.value)}/>}
            </h1>
        );
    }

    balancecall();
    return(
        <div>
            <div className="box">
                {selection_tokenA()}
                <a className="button" href="#select tokenA" >
                    <img src={selected_img(selected_tokenA)}/>
                </a>
            </div>

            <div> <button onClick={swap_token}>Swap</button></div>

            <div className="box">
                {selection_tokenB()}
                <a className="button" href="#select tokenB" >
                    <img src={selected_img(selected_tokenB)}/>
                </a>
            </div>

            <div id="select tokenA" className="overlay">
                <div className="popup">
                    <a className="close" href="#">&times;</a>
                    <div className="content">
                        {selected_tokenB != 1 && <div><input type={"image"} src={img_ethereum} onClick={e=>select_token(1,selected_tokenB)}/></div>}
                        {selected_tokenB != 2 && <div><input type={"image"} src={img_beeba} onClick={e=>select_token(2,selected_tokenB)} /></div>}
                        {selected_tokenB != 3 && <div><input type={"image"} src={img_mistersigz} onClick={e=>select_token(3,selected_tokenB)} /></div>}
                    </div>
                </div>
            </div>
            <div id="select tokenB" className="overlay">
                <div className="popup">
                    <a className="close" href="#">&times;</a>
                    <div className="content">
                        {selected_tokenA != 1 && <div><input type={"image"} src={img_ethereum} onClick={e=>select_token(selected_tokenA,1)}/></div>}
                        {selected_tokenA != 2 && <div><input type={"image"} src={img_beeba} onClick={e=>select_token(selected_tokenA,2)}/></div>}
                        {selected_tokenA != 3 && <div><input type={"image"} src={img_mistersigz} onClick={e=>select_token(selected_tokenA,3)}/></div>}
                    </div>
                </div>
            </div>

            <div>{tokenA} <br/> {web3.utils.fromWei(accountbalance_bee.toString(),"ether")}</div>
             <div><input type={"submit"} value={"Deposit"} onClick={liquidity_deposit}/></div>
            <div><input type={"submit"} value={"withdraw"} onClick={liquidity_withdraw}/></div>

        </div>
    );
}
export default Select_liquidity;