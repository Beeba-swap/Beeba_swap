import React, {Component, useEffect, useState} from "react";
import {useEtherBalance, useEthers, ChainId, useTransactions} from '@usedapp/core'
import beeba from "../../abi/token_beeba.json";
import mistersigz from "../../abi/token_mistersigz.json";
import Wallet from "../component/wallet.js"
import Select_token from "./select_token";
import "../../css/exchange.css"
import Web3 from "web3";


const Exchange = () => {
    //--------------------------------------------------------------
    // Set variable,value
    //--------------------------------------------------------------
    // call web3
        const Web3 = require("web3");
        const web3 = new Web3(Web3.givenProvider);
        // const web3 = new Web3(Web3.givenProvider||'ws://some.local-or-remote.node:8546');
        // const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
        // const web3 = new Web3(rpcURL);

        const {account} = useEthers();
    // import contract
        const contract_beeba = new web3.eth.Contract(beeba.abi,beeba.address);
        const contract_mistersigz = new web3.eth.Contract(mistersigz.abi,mistersigz.address);



    //--------------------------------------------------------------
    // render Use on react runtime
    //--------------------------------------------------------------
    return (
        <div>
            <div>
                <Select_token/>
            </div>
        </div>
    );
}

export default Exchange;
