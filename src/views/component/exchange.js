import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import abi from "../../abi/tokenbeeba.json";

import { formatEther } from '@ethersproject/units'
import Web3 from "web3";

const Exchange = () => {
    let [a,seta] = useState();
    const {account} = useEthers()
    const userBalance = useEtherBalance(account)
    let [tokenA,settokenA]= useState(0);
    let [tokenB,settokenB]=useState(0);
    let supplyA = userBalance;
    let supplyB = a;
    let rateAB = supplyA/supplyB;
    let rateBA = supplyB/supplyA;
    // 0x9dB9c1639A092AD1c4d8ed97F3aE83F453757963

    const Web3 = require('web3');
    const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
    const web3 = new Web3(rpcURL);
    const address =  "0x9dB9c1639A092AD1c4d8ed97F3aE83F453757963"
    const contract = new web3.eth.Contract(abi,address);

    var [swaplog,setswaplog] = useState(false)

    useEffect(() => {

        console.log('render!');
        const a = contract.methods.balanceOf("0x424AFd24416a4Cd67e76EbbA480d2c695C81F750").call((err, result) => { seta(result) });

        return () => console.log('unmounting...');
    }, []);

    const calcexchange = (rate,input_token) => {
        return rate*input_token;
    }
    const swap = () => {
        if (swaplog){
            swaplog = false;

        }
        else{
            swaplog = true;
        }
        setswaplog(swaplog)
    }
    const buytoken = () => {

    }
    return(
        <div>
            <div>
                <button onClick={swap}>SWAP</button>
            </div>
            {!swaplog  && <div>ether:<input type={"number"} value={tokenA} onChange={e=>settokenA(e.target.value)}/><br/>token:<input type={"number"} value={calcexchange(rateBA,tokenA)}/></div>}
            {swaplog  && <div>token:<input type={"number"} value={tokenB} onChange={e=>settokenB(e.target.value)}/><br/>ether:<input type={"number"} value={calcexchange(rateAB,tokenB)}/></div>}

                {/*<div>*/}
                {/*    ether:<input type={"number"} value={tokenA} onChange={e=>settokenA(e.target.value)}/>*/}
                {/*</div>*/}
                {/*<br/>*/}
                {/*<div>*/}
                {/*    token:<input type={"number"} value={calcexchange(rateBA,tokenA)}/>*/}
                {/*</div>*/}
            <div>
                {!swaplog && <button onClick={buytoken}>SUBMIT</button>}
            </div>
                <div>
                    {calcexchange(rateBA,tokenA)}
                </div>
                <div>
                    {tokenB}
                </div>
                <div>
                    {a}
                </div>
                <div>
                    {swap}
                </div>
        </div>
    );
}
export default Exchange