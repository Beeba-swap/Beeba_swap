import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/wallet.css';
const Web3 = require('web3');
const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
const web3 = new Web3(rpcURL);


const Wallet = () => {
    const [showerror,setshowerror] = useState("");
    const { activateBrowserWallet, deactivate, account,chainId} = useEthers()
    const userBalance = useEtherBalance(account)

    if(window.ethereum){
        window.ethereum.request({

            id: 1,
            jsonrpc: "2.0",
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: "0x4",
                }
            ]

        });
    }



    const connect =()=>{
        if(window.ethereum){
            activateBrowserWallet();
            if(chainId != 4){
               window.ethereum.request({

                    id: 1,
                    jsonrpc: "2.0",
                    method: "wallet_switchEthereumChain",
                    params: [
                        {
                            chainId: "0x4",
                        }
                    ]

                });
            }

        }else{
            window.open('https://metamask.io/download', '_blank').focus();
            setshowerror("Please Install Metamask!!");
        }
    }

    return(

        <div class ="head-4">
            {!account && 
            <button className ="connect-wallet" onClick={connect}>
                <FontAwesomeIcon icon ="sign-in-alt" className ="sign-in"  /> Connect Wallet
            </button>}
            {account && <button className ="disconnect-wallet" onClick={deactivate}>
                <FontAwesomeIcon icon ="sign-out-alt" classname ="sign-out" />{account}
                </button>}

            <h4>{showerror}</h4>
            {account && <p>Account: {account}</p>}
            {userBalance && <p>Balance: {formatEther(userBalance)}</p>}
        </div>
    )
}

export default Wallet;