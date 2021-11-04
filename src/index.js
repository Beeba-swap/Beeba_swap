import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChainId,DAppProvider} from "@usedapp/core";


const config = {
    readOnlyChainId: ChainId.Rinkeby,
    readOnlyUrls: {
        [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/d3caf1eed4c3468b949d41bd52059f06',
    },
}

const AppWithRouter = () => (
    <BrowserRouter>
        <DAppProvider config={{}}>
        <App />
        </DAppProvider>
    </BrowserRouter>
)
ReactDOM.render(<AppWithRouter />, document.getElementById('root'))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
