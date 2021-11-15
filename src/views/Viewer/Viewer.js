import React, {useEffect, useState} from "react";
import '../../css/viewer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

const Viewer = () =>{
        const [latest_gas,setlatest_gas] = useState(0);
        const [count_visitor,setcount_vistor] = useState(0);
        const [latest_block,setlatest_block] = useState(0);
        const update_visitor = () =>{
            fetch("https://api.countapi.xyz/update/beeba/?amount=1")
                .then(res => res.json())
                .then( res => {
                        if(res){setcount_vistor(res.value)};
                    }
                )
        }
        const updateblock = () => {
            if(window.ethereum){
                web3.eth.getBlockNumber().then((result)=>{
                    if(result){setlatest_block(result)}
                });
                web3.eth.getGasPrice().then((result)=>{
                    if(result){setlatest_gas(web3.utils.fromWei(result.toString(),"wei"))}}
                )
            }
        }
        useEffect(
            ()=>{
                // console.log()
                update_visitor();
            },[]
        );
    updateblock();

    return(
            <div>
                <div class="container-viewer">
                        <article>
                            <h3>Will you join them?</h3>
                            <p2>The website is <span style={{fontWeight:"600"}}>for educational</span> purposes.not related to commericial. The number are simulated only.</p2>
                        </article>
                        <div class="bottom-box">
                            <div className="user-count"><FontAwesomeIcon icon="gas-pump" className="user-c"/>
                                <article>
                                    <h4><span>{latest_gas} Gas</span></h4>
                                    <p>Gas price by unit wei</p>
                                </article>
                            </div>
                            <div className="viewer-count"><FontAwesomeIcon icon="users" className="viewer-c"/>
                                <article>
                                    <h4><span>{count_visitor} Views</span> </h4>
                                    <p>When start project</p>
                                </article>
                            </div>
                            <div className="trade-count"><FontAwesomeIcon icon="cube" className="trade-c"/>
                                <article>
                                    <h4><span>{latest_block} Block</span> </h4>
                                    <p>Blocknumber on ethereum by<br/> <FontAwesomeIcon icon="network-wired"/>  Rinkeby Testnet</p>
                                </article>
                            </div>
                        </div>
                </div>
            </div>
        );
}
export default Viewer