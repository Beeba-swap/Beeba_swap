import React, {Component, useEffect, useState} from "react";
import {useEtherBalance, useEthers, ChainId, useTransactions} from '@usedapp/core'
import beeba from "../../abi/token_beeba.json";
import mistersigz from "../../abi/token_mistersigz.json";
import liquidity from "../../abi/liquidity.json";
import "../../css/select_token.css"
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

    // import contract
        const contract_beeba = new web3.eth.Contract(beeba.abi,beeba.address);
        const contract_mistersigz = new web3.eth.Contract(mistersigz.abi,mistersigz.address);

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
                contract_beeba.methods.balanceOf(account).call((err,result) =>{setaccountbalance_bbt(result)});
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
        var [accountbalance_bbt,setaccountbalance_bbt] = useState(0); // beeba
        var [accountbalance_sigz,setaccountbalance_sigz] = useState(0); // mistersigz

    //calculate token
        let [tokenA, settokenA] = useState(0); //--> input token on swap
        let [tokenB, settokenB] = useState(0); //--> input token on swap
        let [supplyA,setsupplyA] = useState(0);
        let [supplyB,setsupplyB] = useState(0);
        let rateAB = supplyA / supplyB;
        let rateBA = supplyB / supplyA;

        // set value supply
        useEffect(()=>{
            setsupplyA(providerbalance_eth);
            setsupplyB(providerbalance_bee);
        },[]);

        //calculate rate token
        const calcexchange = (rate, input_token) => {
            return rate * input_token;
        }
        const calcsupply = (_tokenA,_tokenB) => {
            // if(_tokenA == 1) {setsupplyA(providerbalance_eth);}
            // if(_tokenA == 2) {setsupplyA(providerbalance_bee);}
            // if(_tokenA == 3) {setsupplyA(providerbalance_sigz);}
            //
            // if(_tokenB == 1) {setsupplyB(providerbalance_eth);}
            // if(_tokenB == 2) {setsupplyB(providerbalance_bee);}
            // if(_tokenB == 3) {setsupplyB(providerbalance_sigz);}
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
        // select token input
        //--------------------------------------------------------------
        const selection_token = () => {
            return (
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
                </div>
            );
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
                        <div>{"ETH provider | user"}<br/>{providerbalance_eth + " " + accountbalance_eth}</div>
                        <div>
                            {selected_tokenA == 1 && <input type={"number"} value={tokenA} onChange={e=> settokenA(e.target.value)}/>}
                            {selected_tokenB == 1 && <input type={"number"} value={calcexchange(rateBA, tokenA)} onChange={e => settokenB(e.target.value)}/>}
                        </div>
                    </div>
                );
            }
            const token_beeba = () => {
                return (
                    <div>
                        {"Bee provider | user" }<br/>{providerbalance_bee + " " + accountbalance_bbt}
                        <div>
                            {selected_tokenA == 2 && <input type={"number"} value={tokenA} onChange={e=> settokenA(e.target.value)}/>}
                            {selected_tokenB == 2 && <input type={"number"} value={calcexchange(rateBA, tokenA)}/>}
                        </div>
                    </div>
                );
            }
            const token_mistersigz = () => {
                return (
                    <div>
                        {"SIGZ provider | user" }<br/>{providerbalance_sigz+ " " + accountbalance_sigz}
                        <div>
                            {selected_tokenA == 3 && <input type={"number"} value={tokenA} onChange={e=> settokenA(e.target.value)}/>}
                            {selected_tokenB == 3 && <input type={"number"} value={calcexchange(rateBA, tokenA)}/>}
                        </div>
                    </div>
                );
            }
    const test = () =>{
        var web3 = new Web3(Web3.givenProvider||'ws://some.local-or-remote.node:8546');
        // console.log(contract_beeba.options.address)
        const testcon = new web3.eth.Contract(beeba.abi,beeba.address
            , {
                from:account,
                to: '0x2c483815dACeFA416837b5b03510800DAeD7E96B' ,
                value: 500
            }
        )
        // var testcontract = new web3.eth.Contract(liquidity.abi,"0x2071BA5A14bd889793238E4E6cB4841609798b06");
        // testcontract.methods.withdraw().send(
        //     {
        //         from:account
        //         // value: web3.utils.toWei('1',"ether")
        //     }
        // );
        // var a = testcontract.methods.balanceof().call((err,result) => {console.log(result)});
        // console.log(a)
        // testcon.methods.transfer("0x2c483815dACeFA416837b5b03510800DAeD7E96B",web3.utils.toWei('50',"ether")).send({from:account});
        // testcon.methods.mint("0x7Ea9a51Df0E63fCec7549426c85fFD2cC7D6141e",web3.utils.toWei('50',"ether")).send({from:beeba.owner})
        // testcon.methods.burn(web3.utils.toWei('90',"ether")).send({from:beeba.owner});
    }
    //--------------------------------------------------------------
    // render Use on react runtime
    //--------------------------------------------------------------
        balancecall();
    return (
        <div>
            {selection_token()}
        </div>
    );
}

export default Exchange ;