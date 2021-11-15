import beeba_liq from "../../abi/exchange_beeba.json" ;
import beeba from "../../abi/token_beeba.json";
import Select_liquidity from "./select_liquidity.js";
import "../../css/liquidity.css";
import Web3 from "web3";
import {useState} from "react";
import {useEtherBalance, useEthers} from "@usedapp/core";

const Liquidity = () => {
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
        const contract_beeba_liquidity = new web3.eth.Contract(beeba_liq.abi,beeba_liq.address);
        const contract_beeba = new web3.eth.Contract(beeba.abi,beeba.address);
        //execute user
        let  {account} = useEthers();
        let [account_beeba,setaccount_beeba] = useState(parseFloat(0,10))

        var [token,settoken] = useState(parseFloat(0,10));
        var [tokenA,settokenA] = useState(parseFloat(0,10));
        var [tokenB,settokenB] = useState(parseFloat(0,10));

        // balancecall check balance all wallet
        const balancecall = () => {
            // check account (have account?)
            if(account){
                // call balance account (user execute)
                contract_beeba.methods.balanceOf(account).call((err,result) =>{setaccount_beeba(web3.utils.fromWei(result.toString(),'ether'))});
            }
            // contract_beeba_liquidity.methods.balanceOftoken().call((err,result)=>settoken(result));
        }
        const spend = () => {
            if(account){
                // contract_beeba_liquidity.methods.buytoken(web3.utils.toWei("1000","ether")).send({from:account,value:1});
            }
        }
    const img_beeba = "../image/beeba.png" ;
    balancecall()
    return (
        <div>
            <Select_liquidity/>
        </div>
    );
}
export default Liquidity ;