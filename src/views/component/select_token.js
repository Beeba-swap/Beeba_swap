import React, { Component, useEffect, useState } from "react";
import { useEtherBalance, useEthers, ChainId, useTransactions } from '@usedapp/core';
import "../../css/select_token.css"
import Web3 from "web3";
import beeba from "../../abi/token_beeba.json";
import mistersigz from "../../abi/token_mistersigz.json";
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
    // set provider
    // provider = Mistersigz account
    const provider_address = beeba.owner;
    var [providerbalance_eth, setproviderbalance_eth] = useState(0);
    var [providerbalance_bee, setproviderbalance_bee] = useState(0);
    var [providerbalance_sigz, setproviderbalance_sigz] = useState(0);

    // balancecall check balance all wallet
    const balancecall = () => {
        // check account (have account?)
        if (account) {
            // call balance account (user execute)
            contract_beeba.methods.balanceOf(account).call((err, result) => { setaccountbalance_bbt(result) });
            contract_mistersigz.methods.balanceOf(account).call((err, result) => { setaccountbalance_sigz(result) });
        }
        // call balance provider
        web3.eth.getBalance(provider_address).then(result => { setproviderbalance_eth(result) });
        contract_beeba.methods.balanceOf(provider_address).call((err, result) => { setproviderbalance_bee(result) });
        contract_mistersigz.methods.balanceOf(provider_address).call((err, result) => { setproviderbalance_sigz(result) });
    }
    //execute user
    let { account } = useEthers();
    var accountbalance_eth = useEtherBalance(account); // ethers
    var [accountbalance_bbt, setaccountbalance_bbt] = useState(0); // beeba
    var [accountbalance_sigz, setaccountbalance_sigz] = useState(0); // mistersigz
    //calculate token
    let [tokenA, settokenA] = useState(0); //--> input token on swap
    let [tokenB, settokenB] = useState(0); //--> input token on swap
    let [supplyA, setsupplyA] = useState(0);
    let [supplyB, setsupplyB] = useState(0);
    let rateAB = supplyA / supplyB;
    let rateBA = supplyB / supplyA;

    // set value supply
    // useEffect(()=>{
    //     setsupplyA(providerbalance_eth);
    //     setsupplyB(providerbalance_bee);
    // },[]);

    //calculate rate token
    const calcexchange = (rate, input_token) => {
        return rate * input_token;
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
        switch (_tokenA) {
            case 1: setsupplyA(providerbalance_eth); break;
            case 2: setsupplyA(providerbalance_bee); break;
            case 3: setsupplyA(providerbalance_sigz); break;
            default: setsupplyA(0);
        }
        switch (_tokenB) {
            case 1: setsupplyB(providerbalance_eth); break;
            case 2: setsupplyB(providerbalance_bee); break;
            case 3: setsupplyB(providerbalance_sigz); break;
            default: setsupplyB(0);
        }
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
                {selected_tokenA == 1 && <input type={"number"} value={tokenA} onChange={e => settokenA(e.target.value)} />}
                {selected_tokenB == 1 && <input type={"number"} value={calcexchange(rateBA, tokenA)} onChange={e => settokenB(e.target.value)} />}
            </span>
        );
    }
    const token_beeba = () => {
        return (
            <span>
                {selected_tokenA == 2 && <input type={"number"} value={tokenA} onChange={e => settokenA(e.target.value)} />}
                {selected_tokenB == 2 && <input type={"number"} value={calcexchange(rateBA, tokenA)} />}
            </span>
        );
    }
    const token_mistersigz = () => {
        return (
            <span>
                {selected_tokenA == 3 && <input type={"number"} value={tokenA} onChange={e => settokenA(e.target.value)} />}
                {selected_tokenB == 3 && <input type={"number"} value={calcexchange(rateBA, tokenA)} />}
            </span>
        );
    }

    balancecall();
    return (
        <div>
            <div class="swap-box">
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
                <div class="exhange-connect">
                <Wallet />
                </div>
            </div>
        </div>
    );
}
export default Select_token;