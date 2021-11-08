import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
// <<<<<<< backend
// // const Web3 = require('web3');
// // const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
// // const web3 = new Web3(rpcURL);
// // =======
// // import '../../css/wallet.css';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// >>>>>>> main

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

        <div>
            {!account && 
            <button className ="connect-wallet" onClick={connect}>
                <FontAwesomeIcon icon ="sign-in-alt" className ="sign-in"  /> Connect Wallet
            </button>}
            {account && <button className ="disconnect-wallet" onClick={deactivate}>{account}</button>}

            <h4>{showerror}</h4>
            {account && <p>Account: {account}</p>}
            {userBalance && <p>Balance: {formatEther(userBalance)}</p>}
        </div>
    )
}

export default Wallet;