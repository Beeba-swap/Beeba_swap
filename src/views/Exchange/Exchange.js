import React, {useEffect, useState} from "react";
import { useEtherBalance, useEthers, ChainId } from '@usedapp/core'
import Select_token from "../component/select_token.js";

const Exchange = () => {
  return(
      <div>
          <Select_token/>
      </div>
  );
}

export default Exchange;