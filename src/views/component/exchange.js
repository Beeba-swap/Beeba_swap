import React, {Component, useEffect, useState} from "react";
import {useEtherBalance, useEthers, ChainId, useTransactions} from '@usedapp/core'
import tokenbeeba from "../../abi/token_beeba.json";
import tokenmistersigz from "../../abi/token_mistersigz.json";
import "../../css/select_token.css";
import Web3 from "web3";



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
    //--------------------------------------------------------------
    // Swap token
    //--------------------------------------------------------------
        const _swap = () =>{
            if(!swaplog){
                swaptoken(tokenA,accountbalance_eth)
            }
            else{
                swaptoken(tokenB,accountbalance_eth)
            }
        }
        const swaptoken = (_token,_balance) => {
            _balance = unit18(_balance);
            console.log(_token + " " + _balance);
            if(_token < _balance){
                alert("Can")
            }
            else{
                alert("not enough mineral")
            }
        }
        // console.log(contract_beeba.methods.transfer(account,200).encodeABI())
    //----------------------------------    ----------------------------
    // Test
    //--------------------------------------------------------------
    const test = () =>{
        var web3 = new Web3(Web3.givenProvider||'ws://some.local-or-remote.node:8546');
        console.log(contract_beeba.options.address)
         const testcon = new web3.eth.Contract(tokenbeeba.abi,address_beeba
             , {
            from:account,
            to: '0x2c483815dACeFA416837b5b03510800DAeD7E96B' ,
            value: 500
        }
        )
        testcon.methods.transfer("0x2c483815dACeFA416837b5b03510800DAeD7E96B",web3.utils.toWei('50',"ether")).send({from:account});
        // window.ethereum
        //     .request({
        //         method: 'eth_sendTransaction',
        //         params: [
        //             {
        //                 chainId: 0x4,
        //                 id: 4,
        //                 from: account,
        //                 to: '0x7Ea9a51Df0E63fCec7549426c85fFD2cC7D6141e',
        //                 value: '1000000000000000',
        //             },
        //         ],
        //     })
        //     .then((txHash) => console.log(txHash))
        //     .catch((error) => console.error);
        // testcon.methods.approve(testcon.options.address,55).send({from:account});
        // console.log(testcon.options.address)
        // console.log(testcon.options)
        // contract_beeba.Transaction({from:account,to:'0x7Ea9a51Df0E63fCec7549426c85fFD2cC7D6141e',value:10000})
        // contract_beeba.methods.sendTransaction({from:account,to:'0x7Ea9a51Df0E63fCec7549426c85fFD2cC7D6141e',value:10000});
        // web3.eth.sendTransaction({from:account,to:"0x2c483815dACeFA416837b5b03510800DAeD7E96B",value:10000,chain:'0x4',data:testcon}).then(console.log)
        // web3.eth.Contract(tokenbeeba.abi,address_beeba).balanceOf(account).then(console.log);
        // web3.eth.getBalance(account).then(console.log);
        // web3.eth.getBlockUncleCount("0x407d73d8a49eeb85d32cf465507dd71d507100c1")
        //     .then(console.log);
//transfer is the function in the contract to transfer money from wallet A to B
//         var Data = contract_beeba.methods.transfer.getData(receiver,500);
//         web3.eth.sendTransaction({to:receiver, from:sender, data: Data});
    }


    //--------------------------------------------------------------
    // Use on react runtime
    //--------------------------------------------------------------
        balance_check();
    //--------------------------------------------------------------
    // render!
    //--------------------------------------------------------------
    return (
        <div style={{borderRadius:"20px",border:"solid 2px"}} >
            <div>
                <button onClick={swap}>SWAP</button>
            </div>
            { !swaplog &&
                <div>
                    ether:<input type={"number"} value={tokenA} onChange={e => settokenA(e.target.value)}/>
                    <button>
                        <img src={img_ethereum} style={{width:"40px",height:"40px",borderRadius:"20px"}}/>
                    </button>

                    <br/>

                    token:<input type={"number"} value={calcexchange(rateBA, tokenA)}/>
                    <button>
                        <img src={img_beeba} style={{width:"40px",height:"40px",borderRadius:"20px"}}/>
                    </button>
                </div>
            }
            { swaplog &&
                <div>
                    token:<input type={"number"} value={tokenB} onChange={e => settokenB(e.target.value)}/>
                    <button><img src={img_beeba} style={{width:"40px",height:"40px",borderRadius:"20px"}}/></button>
                    <br/>
                    ether:<input type={"number"} value={calcexchange(rateAB, tokenB)}/>
                    <button><img src={img_ethereum} style={{width:"40px",height:"40px",borderRadius:"20px"}}/></button>
                </div>
            }
            <div>
                {account}
                <br/>
                <button onClick={test}>swap</button>
                <div>
                    {"\nETH provider | user"}<br/>{provider_amounteth + " " + accountbalance_eth}
                </div>
                <div>
                    {"\nBBT provider | user\n" }<br/>{provider_amountbbt + " " + accountbalance_bbt}
                </div>
                <div>
                    {"\nSIGZ provider | user\n" }<br/>{ provider_amountsigz+ " " + accountbalance_sigz}
                </div>
            </div>
        </div>
    );
}

export default Exchanges