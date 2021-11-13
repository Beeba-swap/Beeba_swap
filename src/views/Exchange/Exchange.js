import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import _Exchange from "../component/exchange";

const Exchange = () => {
  return(

      <div>
          <_Exchange/>
      </div>
  );
}

export default Exchange;