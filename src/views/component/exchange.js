import React, {Component, useEffect, useState} from "react";
import {useEtherBalance, useEthers, ChainId, useTransactions} from '@usedapp/core'
import beeba from "../../abi/token_beeba.json";
import mistersigz from "../../abi/token_mistersigz.json";
import Select_token from "./select_token";
import Web3 from "web3";
// <<<<<<< frontend



const Exchanges = () => {
    //use contract(another address)
        const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
        //*--- set value *---*
        const address_beeba = "0x8C701E8144d1F6648106cd5383d2C0213402cdAC";
        const address_mistersigz = "0xddC24BcEa1B408B542244D4d0cC197255f4df77F";
        const Web3 = require("web3");
        const web3 = new Web3(rpcURL);
        //*------------------*
        const contract_beeba = new web3.eth.Contract(tokenbeeba.abi,address_beeba); //import contract_beeba
        const contract_mistersigz = new web3.eth.Contract(tokenmistersigz.abi,address_mistersigz); //import contract_mistersigz
        //*------------------------------------------------------
        // Set value provider
        //-------------------------------------------------------*
        var [provider_address,setprovider_address] = useState("0x424AFd24416a4Cd67e76EbbA480d2c695C81F750");
        var [provider_amounteth,setprovider_amounteth] = useState(0);
        var [provider_amountbbt,setprovider_amountbbt] = useState(0);
        var [provider_amountsigz,setprovider_amountsigz] = useState(0);
        //*------------------------------------------------------
        // Set value wallet provider
        //-------------------------------------------------------*
            useEffect( () =>
                {
                    web3.eth.getBalance(provider_address).then(result=>{setprovider_amounteth(result)});
                    contract_beeba.methods.balanceOf(provider_address).call((err,result) =>{setprovider_amountbbt(result)});
                    contract_mistersigz.methods.balanceOf(provider_address).call((err,result)=>{setprovider_amountsigz(result)});
                },[]
            );
    //use contract(ethers) execute user
        let  {account} = useEthers();
        //ethers
        var accountbalance_eth = useEtherBalance(account);
        //beeba
        var [accountbalance_bbt,setaccountbalance_bbt] = useState(0);
        //mistersigz
        var [accountbalance_sigz,setaccountbalance_sigz] = useState(0);
        const balance_check = () => {
            if(account){
                contract_beeba.methods.balanceOf(account).call((err,result) =>{setaccountbalance_bbt(result)});
                contract_mistersigz.methods.balanceOf(account).call((err,result) => {setaccountbalance_sigz(result)});
            }
        }

    //use on react app
        let [tokenA, settokenA] = useState(0); //--> input token on swap
        let [tokenB, settokenB] = useState(0); //--> input token on swap
        let supplyA = provider_amounteth;
        let supplyB = provider_amountbbt;
        let rateAB = supplyA / supplyB;
        let rateBA = supplyB / supplyA;
        const calcexchange = (rate, input_token) => {
            return rate * input_token;
        }
        let unit18 = (value) => {
            return (value/(10**18)) ;
        }
        //use on swap button
            var [swaplog, setswaplog] = useState(false)
            const swap = () => {
                if (swaplog) {
                    swaplog = false;
                }
                else {
                    swaplog = true;
                }
                setswaplog(swaplog)
            }
    //--------------------------------------------------------------
    // Select token
    //--------------------------------------------------------------
        let img_ethereum = "../image/ethereum.png" ;
        let img_beeba = "../image/beeba.png" ;
        let img_mistersigz = "../image/mistersigz.png";
        let select = 0 ;
    // const select_token = () => {
    //
    // }
    function popup() {
        var _popup = document.getElementById("myPopup");
        _popup.classList.toggle("show");
    }
=======
const Exchange = () => {
// >>>>>>> main
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

    //--------------------------------------------------------------
    // render Use on react runtime
    //--------------------------------------------------------------
    return (
        <div>
            <Select_token/>
        </div>
    );
}

// <<<<<<< frontend
export default Exchanges
=======
export default Exchange ;
// >>>>>>> main
