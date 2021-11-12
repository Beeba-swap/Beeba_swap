import React, {useState} from "react";

const Test = () => {
    let user_eth = 1 ;
    var [user_beeba,setuser_beeba] = useState(500) ;
    var [user_mistersigz,setuser_mistersigz] = useState(5000 );

    let [supply_ether,setsupply_ether] = useState(10) ;
    let [supply_beeba,setsupply_beeba] = useState(10000) ;
    let [supply_mistersigz,setsupply_mistersigz] = useState(10000);

    let rate_bee_per_eth = supply_beeba/supply_ether ;
    let rate_sigz_per_eth = supply_mistersigz/supply_ether ;

    let rate_bee_per_sigz =  supply_beeba/supply_mistersigz ;
    let rate_sigz_per_bee = supply_mistersigz/supply_beeba;

    var [inputbeeba,setinputbeeba] = useState(0);
    var [inputmistersigz,setinputmistersigz] = useState(0);
    const cal = (input,rate) => {
        return rate*input ;
    }
    // console.log(rate_bee_per_sigz);
    const swaped = () => {
        setuser_beeba(user_beeba-inputbeeba);
        setuser_mistersigz(user_mistersigz + cal(inputbeeba,rate_sigz_per_bee));
        setsupply_beeba(parseInt(supply_beeba,10)+parseInt(inputbeeba,10));
        setsupply_mistersigz(supply_mistersigz-cal(inputbeeba,rate_sigz_per_bee))
    }
    const swapedsig = () => {

        setuser_mistersigz(parseFloat(user_mistersigz,10)-parseFloat(inputmistersigz,10));
        setuser_beeba(parseFloat(user_beeba,10)-parseFloat(cal(inputmistersigz,rate_bee_per_sigz),10));
        setsupply_beeba(parseFloat(supply_beeba,10)- parseFloat(cal(inputmistersigz,rate_bee_per_sigz),10));
        setsupply_mistersigz(parseFloat(supply_mistersigz,10)+parseFloat(inputmistersigz,10));
    }
    return(

        <div>
            <div>------------------------------------</div>
            <div><h4>User</h4></div>
            <div>ether: {user_eth}</div>
            <div>beeba: {user_beeba}</div>
            <div>mistersigz: {user_mistersigz}</div>
            <div>------------------------------------</div>
            <br/>
            <div>------------------------------------</div>
            <div><h4>supply</h4></div>
            <div>ether: {supply_ether}</div>
            <div>mistersigz: {supply_mistersigz}</div>
            <div>beeba: {supply_beeba}</div>
            <div>------------------------------------</div>
            <br/>
            <div>------------------------------------</div>
            <div><h4>Rate</h4></div>
            <div>beeba / ether: {rate_bee_per_eth}</div>
            <div>mistersigz / ether: {rate_sigz_per_eth}</div>
            <div>beeba / mistersigz: {rate_bee_per_sigz}</div>
            <div>mistersigz / beeba: {rate_sigz_per_bee}</div>
            <div>------------------------------------</div>
            <br/>
            <div><h4>cal</h4></div>
            <div>beeba: <input value={inputbeeba} onChange={e => setinputbeeba(e.target.value)}/></div>
            <div>
                mistersigz: <input value={cal(inputbeeba,rate_sigz_per_bee)}/>
            </div>
            <div><h4>swap</h4></div>
            <div><input type={"submit"} value={"submit"} onClick={swaped}/></div>
            <div>------------------------------------</div>
            <br/>
            <br/>
            <div>------------------------------------</div>
            <div>
                <h4>mistersig->beeba</h4>
                <div>mistersigz: <input value={inputmistersigz} onChange={e => setinputmistersigz(e.target.value)}/></div>
                <div>
                     beeba: <input value={cal(inputmistersigz,rate_bee_per_sigz)}/>
                </div>
                <div><h4>swap</h4></div>
                <div><input type={"submit"} value={"submit"} onClick={swapedsig}/></div>
            </div>

            <div>------------------------------------</div>



        </div>
    );
}

export default Test;