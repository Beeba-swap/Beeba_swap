import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import beeba from "../../abi/token_beeba.json";
import mistersigz from "../../abi/token_mistersigz.json";
import "../../css/popup.css"
import '../../css/wallet.css';

const Web3 = require('web3');
const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
const web3 = new Web3(rpcURL);


const Wallet = () => {
    const [showerror,setshowerror] = useState("");
    const { activateBrowserWallet, deactivate, account,chainId} = useEthers()
    const userBalance = useEtherBalance(account)
    const contract_beeba = new web3.eth.Contract(beeba.abi, beeba.address);
    const contract_mistersigz = new web3.eth.Contract(mistersigz.abi, mistersigz.address);
    let [beeba_balance,setbeeba_balance] = useState(0);
    let [mistersigz_balance,setmistersigz_balance] = useState(0);

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
    const connect = () =>{
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
            // open("#list-provider")
            window.location = "#list-provider" ;
            // window.open('https://metamask.io/download', '_blank').focus();
            setshowerror("Please Install Metamask!!");
        }
    }

    const disconnect = () => {
        if(account){
            // contract_beeba.methods.balanceOf(account).call((result)=>{if(result){setbeeba_balance(web3.utils.fromWei(result.toString(),"ether"))}});
            // contract_mistersigz.methods.balanceOf(account).call((result)=>{if(result){setmistersigz_balance(web3.utils.fromWei(result.toString(),"ether"))}});
            window.location = "#menu" ;
        }
        console.log("hellow")
    }
    const disconnected = () => {
        if(account){
            window.location = "#" ;
        }
    }
    const balancecall = () => {
        // check account (have account?)
        if (account) {
            // call balance account (user execute)
            // (web3.utils.fromWei(useEtherBalance(account).toString(),"ether"));
            contract_beeba.methods.balanceOf(account).call((err, result) => { setbeeba_balance(web3.utils.fromWei(result.toString(),"ether")) });
            contract_mistersigz.methods.balanceOf(account).call((err, result) => { setmistersigz_balance(web3.utils.fromWei(result.toString(),"ether")) });
        }
    }
    const meta_mask = () =>{
        window.open('https://metamask.io/download', '_blank').focus();
    }
    // {/*<h4>{showerror}</h4>*/}
    // {/*{account && <p>Account: {account}</p>}*/}
    // {/*{userBalance && <p>Balance: {formatEther(userBalance)}</p>}*/}
    // <button onClick={deactivate}>
    balancecall();
    return(
        <div>
            <div className="wallet">
                {!account &&
                <div>
                    <FontAwesomeIcon icon="sign-in-alt" className="sign-in"/>
                    <button onClick={connect}>
                        <p className="account-wallet">Connect Wallet</p>
                    </button>
                </div>
                }
                {account &&
                <div>
                    <FontAwesomeIcon icon="sign-out-alt" className="sign-out"/>
                    <button onClick={disconnect}>
                        <p className="account-wallet">{account}</p>
                    </button>
                </div>
                }
            </div>
            <div id="list-provider" className="overlay">
                <div className="popup">
                    <span><a className="close" href="#">&times;</a></span>
                    <div className="content">
                            <h2>Connect Wallet</h2>
                            <hr></hr>
                        <div className="select">
                            <button onClick={meta_mask}>
                                <img src={"./image/iconmetamask.png"}/>
                                <h4>Meta mask</h4>
                            </button>
                            <button>
                                <h1>...</h1>
                                <h4>More</h4>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="menu" className="overlay">
                <div className="popup">
                    <span><a className="close" href="#">&times;</a></span>
                    <div className="content">
                        <h4 className="account-option"><FontAwesomeIcon icon="user" className="user"/>{account}</h4>
                        <hr/>
                        <div className="token">
                            {userBalance &&<div><pre><img src={"./image/ethereum.png"}/>{formatEther(userBalance)}<span> Eth</span></pre></div>}
                            {userBalance&&<div><pre><img src={"./image/beeba.png"}/>{beeba_balance}<span> Bee</span> </pre></div>}
                            {userBalance&&<div><pre><img src={"./image/mistersigz.png"}/>{mistersigz_balance} <span> Sigz</span></pre></div>}

                        </div>
                        <div className={"logout"}>
                            {account && <FontAwesomeIcon icon="sign-out-alt" className="sign-out"/> && <button onClick={deactivate} >Logout</button>}
                            {!account && <button onClick={()=>{window.location = "#"}}>&times;</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet;