import React, { useState } from "react";

export default function EggsNone(props) {

    let [eggStatus, setEggStatus] = useState('activeEgg')
    let timer
    if (props.toggleLid) {
        timer = setTimeout(() => setEggStatus(eggStatus = 'none'), 2000)
    }else clearTimeout(timer)

    return (
        <>
            <div className={`egg LU1 ${eggStatus}`}></div>
            <div className={`egg LU2 ${eggStatus}`}></div>
            <div className={`egg LU3 ${eggStatus}`}></div>
            <div className={`egg LU4 ${eggStatus}`}></div>
            <div className={`egg LU5 ${eggStatus}`}></div>
            <div className={`egg LD1 ${eggStatus}`}></div>
            <div className={`egg LD2 ${eggStatus}`}></div>
            <div className={`egg LD3 ${eggStatus}`}></div>
            <div className={`egg LD4 ${eggStatus}`}></div>
            <div className={`egg LD5 ${eggStatus}`}></div>
            <div className={`egg RU1 ${eggStatus}`}></div>
            <div className={`egg RU2 ${eggStatus}`}></div>
            <div className={`egg RU3 ${eggStatus}`}></div>
            <div className={`egg RU4 ${eggStatus}`}></div>
            <div className={`egg RU5 ${eggStatus}`}></div>
            <div className={`egg RD1 ${eggStatus}`}></div>
            <div className={`egg RD2 ${eggStatus}`}></div>
            <div className={`egg RD3 ${eggStatus}`}></div>
            <div className={`egg RD4 ${eggStatus}`}></div>
            <div className={`egg RD5 ${eggStatus}`}></div>
        </>
    )
}


