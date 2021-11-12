import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import Exchanges from '../component/exchange.js';


const Exchange = () => {

  return(

      <div>
          <Exchanges />
      </div>
  )
}

export default Exchange;