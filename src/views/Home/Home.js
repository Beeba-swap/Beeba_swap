import React, {useEffect,useState} from "react";
import abi from "../../abi/test.json";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

const Web3 = require('web3');
const rpcURL = 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06';
const web3 = new Web3(rpcURL);
const address =  "0x6D9297ba1ddD7525FF9bdaE492965E8f134518Fa"
const contract = new web3.eth.Contract(abi,address);

function LifecycleDemo() {
    const [a,seta] = useState("")

    useEffect(() => {

        console.log('render!');
        const a = contract.methods.Square(5,2).call((err, result) => { seta(result) });

        return () => console.log('unmounting...');
    }, []);

    return a;
}


 const Home = props =>{
     const { activateBrowserWallet, deactivate, account,chainId} = useEthers()
     const userBalance = useEtherBalance(account)
     // const networkData = [
     //
     //     {
     //
     //         chainId: "0x1",
     //
     //         rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
     //
     //         blockExplorerUrls: ["https://etherscan.io"],
     //     }
     //
     // ];

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



    //  const componentDidMount = async()=>{
    //      const a = await contract.methods.Square(5,2).call();
    //      const b = await contract.methods.Power(8).call();
    //      this.setState ({ a,b });
    //  }
    // const [account,setaccount] = useState("")
    // const connect = () =>{
    //     provider.eth.requestAccounts();
    //     const account = provider.eth.getAccounts()
    //
    //     provider.eth.getAccounts().then(accounts => {
    //         setaccount(accounts)
    //         return accounts[0];
    //     })
    //
    //
    // }
    //  useEffect(() => {
    //      const a = contract.methods.Square(5,2).call();
    //      seta(a)
    //      return () => {
    //          console.log('will unmount');
    //      }
    //  }, [a]);



        return(
        <div>
            {!account && <button onClick={activateBrowserWallet}> Connect </button>}
            {account && <button onClick={deactivate}> Disconnect </button>}
            {account && <p>Account: {account}</p>}
            {userBalance && <p>Balance: {formatEther(userBalance)}</p>}
            <LifecycleDemo/>
        </div>
        );

}
export default Home