import React from "react";
import Select_liquidity from "../component/liquidity.js";
import beeba from "../../abi/token_beeba.json";
import {useEthers} from "@usedapp/core";

const Liquidity = () =>{


    let { account } = useEthers();
        return(
            <div>
                { account == beeba.owner&&<Select_liquidity/>}
            </div>
        );

}
export default Liquidity;