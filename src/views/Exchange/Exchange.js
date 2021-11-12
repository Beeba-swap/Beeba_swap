import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
// <<<<<<< frontend
import Exchanges from '../component/exchange.js';

// =======
import _Exchange from "../component/exchange";
// >>>>>>> main

const Exchange = () => {
  return(

      <div>
// <<<<<<< frontend
          <Exchanges />
=======
          <_Exchange/>
// >>>>>>> main
      </div>
  );
}

export default Exchange;