import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'


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
            {!account && <button onClick={connect}>connect</button>}
            {account && <button onClick={deactivate}>{account}</button>}

            <h4>{showerror}</h4>
            {account && <p>Account: {account}</p>}
            {userBalance && <p>Balance: {formatEther(userBalance)}</p>}
        </div>
    )
}

export default Wallet;