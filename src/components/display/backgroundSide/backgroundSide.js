import React, { useState } from "react";
import Battery from "../../img/placeWithBattery1.png";

function BackgrounSide(props) {

    let [top, setTop] = useState(38);
    let [isOpen, isValue] = useState(false);
    let [back, setBack] = useState("rgba(217, 213, 202, 0)");
    const config = {
        top: `${top}px`,
        isOpen: isOpen,
    }

    const configForPlaceForbattery = {

        background: `${back} no-repeat`
    }

    let on = () => {
        setTop(top += 260)
        isValue(isOpen = !isOpen)
    }

    let off = () => {
        setTop(top -= 260)
        isValue(isOpen = !isOpen)
    }

    return <div className={`backSide ${props.prop}`}>
        <div className="placeForbattery" style={configForPlaceForbattery} onClick={() => {
            setBack(back===`url(${Battery})`?"rgba(217, 213, 202, 0)":`url(${Battery})`)
            props.onClick()
        }} />
        <div className="batteryLid"
            style={config}
            onClick={() => {
                config.isOpen ? off() : on()
            }} />
    </div>
}

export default BackgrounSide;