import React, {useState} from "react";
import "./volk.css";


export default function Volk(props){

    let [wolfStatus, setWolfStatus] = useState('active')
    let timer
    if (props.toggleLid) {
        timer = setTimeout(() => setWolfStatus(wolfStatus = 'none'), 2000)
    }else clearTimeout(timer)
    
    return(
        <>
            <div className={`volk1 ${wolfStatus}`}></div>
            <div className={`volk2 ${wolfStatus}`}></div>
            <div className={`volk-hand1 ${wolfStatus}`}></div>
            <div className={`volk-hand2 ${wolfStatus}`}></div>
            <div className={`volk-hand3 ${wolfStatus}`}></div>
            <div className={`volk-hand4 ${wolfStatus}`}></div>
        </>
    )
}
