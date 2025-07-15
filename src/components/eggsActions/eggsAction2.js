import React, { Component } from "react";
import EggsNone from "../eggs";
import "../eggsActions/eggsActions.css";
import actEggSound from "../sounds/bit-pong-sound.mp3";
import hitEgg from "../sounds/bit-punch.mp3";
import { Howl, Howler } from "howler";

const audioClips = [
    { sound: actEggSound, label: "actEggSound" },
    { sound: hitEgg, label: "hitEgg" }
]

export default class EggsActions extends Component {


    constructor(props) {
        super(props);
        this.state = {
            posLU: true,
            posLD: true,
            posRU: true,
            posRD: true,
            posLU1: true,
            posLD1: true,
            posRU1: true,
            posRD1: true,
            LU: 'egg LU1 noneEgg ',
            LD: 'egg LD1 noneEgg',
            RU: 'egg RU1 noneEgg',
            RD: 'egg RD1 noneEgg',
            LU1: 'egg LU1 noneEgg',
            LD1: 'egg LD1 noneEgg',
            RU1: 'egg RU1 noneEgg',
            RD1: 'egg RD1 noneEgg',
            speedEgg: 0,
            respaunEgg: 0,
            num: "volk1 active", numh: "volk-hand2 active",
            score: 0,
            mistakes: 0,
            loss: 0,
            acceleration: 0,
            timerOn: false,
            newFlag: ""


        };
        this.start1 = this.start1.bind(this);
        // this.start11 = this.start11.bind(this);
        this.beginA = this.beginA.bind(this);
        this.beginB = this.beginB.bind(this);
        this.auto = this.auto.bind(this);

        this.renderWolf = this.renderWolf.bind(this);
        this.checkPos = this.checkPos.bind(this);
        this.loss = this.loss.bind(this);
        this.time = this.time.bind(this);

    }

    SoundPlay = (src) => {
        const sound = new Howl({
            src
        })
        sound.play()
    }


    // RenderNewButton = () => {
    //     return audioClips.map((soundObj, index) => {
    //         return (
    //             <button key={index} onClick={() => this.SoundPlay(soundObj.sound)}>
    //                 {soundObj.label}
    //             </button>
    //         )
    //     })
    // }
    /////////////////////////////////////////////
    componentDidMount() {
        document.addEventListener("keydown", this.checkKey);
        let currentMode = localStorage.getItem('SelectedMode');
        if(currentMode==="gameA"){
            this.beginA()
        }
        if(currentMode==="gameB"){
            this.beginB()
        }
    }



    componentDidUpdate() {
        if (this.state.loss === 120) {
            setTimeout(() => this.setState({ loss: 0 }), 4000);
        }

    }

    //////////////////////////////////////////////////////
    ///////Проверка свободной позиции для рендеринга яйца
    checkPos() {
        if (this.state.posLU === true || this.state.posLU1 === true) {
            this.start1("LU", "posLU")
        } else
            if (this.state.posLD === true || this.state.posLD1 === true) {
                this.start1("LD", "posLD")
            } else
                if (this.state.posRU === true || this.state.posRU1 === true) {
                    this.start1("RU", "posRU")
                } else
                    if (this.state.posRD === true || this.state.posRD1 === true) {
                        this.start1("RD", "posRD")
                    }
    }


    clickGameA(){
        localStorage.setItem( 'SelectedMode', "gameA" )
        window.location.reload();
    }


    clickGameB(){
        localStorage.setItem( 'SelectedMode', "gameB" )
        window.location.reload();
    }


    /////////////////////////////////////////////
    ///Функция генерации яиц с определенным интервалом
    
    beginA() {
        
        
            
            this.state.speedEgg = 500;
            this.state.respaunEgg = 1000;
            this.setState({ timerOn: false });
            let timerB = setInterval(() => {
                
                this.auto()
                if (this.state.loss === 120 || this.state.mistakes === 3) {
                    this.state.turningOffMode()
                    clearInterval(timerB)
                }
            }, this.state.respaunEgg)
        
    }


    turningOffMode(){
        localStorage.setItem( 'SelectedMode',"" )
        localStorage.setItem( 'score', this.state.score )
        console.log(localStorage)  
    }



    beginB() {

        this.state.speedEgg = 100;
            this.state.respaunEgg = 100;
            this.setState({ timerOn: false });
            let timerB = setInterval(() => {
                console.log("new")
                this.auto()
                if (this.state.loss === 120 || this.state.mistakes === 3) {
                    localStorage.setItem( 'score', this.state.score )
                    localStorage.setItem( 'SelectedMode',"" )
                    console.log(localStorage)
                    clearInterval(timerB)
                }
            }, this.state.respaunEgg)
       
    }


    /////////////////////////////////////////////////
    //Функция рендера случайного яйца 
    auto() {
        let num = this.randomInteger(1, 4);


        switch (num) {
            case 1:
                if (this.state.posLU === true || this.state.posLU1 === true) {
                    this.start1("LU", "posLU")
                } else

                    if (this.state.posLU === false && this.state.posLU1 === false) {
                        this.checkPos()
                    }
                break;
            case 2:
                if (this.state.posLD === true || this.state.posLD1 === true) {
                    this.start1("LD", "posLD")
                } else

                    if (this.state.posLD === false && this.state.posLD1 === false) {
                        this.checkPos()
                    }
                break;
            case 3:
                if (this.state.posRU === true || this.state.posRU1 === true) {
                    this.start1("RU", "posRU")
                } else

                    if (this.state.posRU === false && this.state.posRU1 === false) {
                        this.checkPos()
                    }
                break;
            case 4:
                if (this.state.posRD === true || this.state.posRD1 === true) {
                    this.start1("RD", "posRD")
                } else

                    if (this.state.posRD === false && this.state.posRD1 === false) {
                        this.checkPos()
                    }
                break;
            default:
                break;
        }
    }


    start1(i, pos) {
        if (this.state.mistakes !== 3) {
            let x = i;
            let y = pos;

            let pos1 = y
            let pos2 = y + 1
            // console.log(pos2)

            if (this.state[pos1] === false && this.state[pos2] === true) {
                x += 1;
                y += 1;
            }
            // console.log(x, y)

            let self = this;

            // Если нет ошибок, то вешается таймаут.
            // Если ошибки есть, то выводится alert о том, что ты проиграл и выполняется выход из функции
            // С помощью return


            let timer = setTimeout(function makeEggStep(positionNumber = 1) {
                let currentPositionNumber = positionNumber;

                // Здесь просто яйцо ставится в текущую позицию
                self.setState({ [x]: `egg ${i}${currentPositionNumber} activeEgg` });
                // Если начальная позиция 1, то флаг ставится в false
                if (currentPositionNumber === 1) {
                    self.setState({ [y]: false });
                }

                if (self.state.timerOn === false) {
                    self.SoundPlay(actEggSound)
                }


                if (self.state.mistakes === 3 || currentPositionNumber === 6) {
                    self.setState({ [x]: `egg ${i}1 noneEgg` });
                    self.setState({ [y]: true });
                    clearTimeout(timer);

                    return
                }

                if (currentPositionNumber === 5) {
                    if (self.state.timerOn === true) {
                        setTimeout(() => self.checkScoreOrMistakeInAutoPlay(x, i), self.state.speedEgg * 0.5)
                    } else {
                        setTimeout(() => self.checkScoreOrMistake(x, i), self.state.speedEgg * 0.5)
                    }
                }

                timer = setTimeout(makeEggStep, self.state.speedEgg, currentPositionNumber + 1);
            }, this.state.speedEgg);

        } else {

            return;
        }

    }



    moveEgg(x, y, egg) {

    }




    time() {
        this.reset();
        if (this.state.timerOn === false) {
            let date = new Date(),
                hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
                minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
                seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
            this.state.speedEgg = 500;
            this.state.respaunEgg = 500;

            this.setState({ timerOn: true })
            this.setState({ score: [hours, ":", minutes] })

            let timerTime = setInterval(() => {
                this.auto()
                if (this.state.loss === 120 || this.state.timerOn === false) {
                    clearInterval(timerTime)
                }

            }, this.state.respaunEgg)
        } else {
            this.state.timerOn = false

            return;
        }

    }

    ///////////////////////////////////////////
    //Функция генерации рандомного числа
    randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    reset() {
        this.setState({ score: 0 });
        this.setState({ mistakes: 0 });
        this.setState({ loss: 0 });
    }

    //////////////////////////////////////////
    //Проверка успеха или ошибки
    checkScoreOrMistake(x, egg) {
        if (this.state[x] === `egg ${egg}5 activeEgg`) {
            if ((x === "LU" && this.state.numh === "volk-hand2 active") || (x === "LU1" && this.state.numh === "volk-hand2 active")) {
                this.SoundPlay(hitEgg)
                this.setState({ score: this.state.score + 1 })
                this.nextAcceleration()
            } else
                if ((x === "LD" && this.state.numh === "volk-hand1 active") || (x === "LD1" && this.state.numh === "volk-hand1 active")) {
                    this.SoundPlay(hitEgg)
                    this.setState({ score: this.state.score + 1 })
                    this.nextAcceleration()
                } else
                    if ((x === "RU" && this.state.numh === "volk-hand4 active") || (x === "RU1" && this.state.numh === "volk-hand4 active")) {
                        this.SoundPlay(hitEgg)
                        this.setState({ score: this.state.score + 1 })
                        this.nextAcceleration()
                    } else
                        if ((x === "RD" && this.state.numh === "volk-hand3 active") || (x === "RD1" && this.state.numh === "volk-hand3 active")) {
                            this.SoundPlay(hitEgg)
                            this.setState({ score: this.state.score + 1 })
                            this.nextAcceleration()
                        } else {
                            this.loser()
                            this.setState({ mistakes: this.state.mistakes + 1 })
                        }
        }
    }

    checkScoreOrMistakeInAutoPlay(x, egg) {
        if (this.state[x] === `egg ${egg}5 activeEgg`) {
            if (x === "LU" || x === "LU1") {
                this.setState({ numh: "volk-hand2 active" })
                this.setState({ num: "volk1 active" })

            } else
                if (x === "LD" || x === "LD1") {
                    this.setState({ numh: "volk-hand1 active" })
                    this.setState({ num: "volk1 active" })
                } else
                    if (x === "RU" || x === "RU1") {
                        this.setState({ numh: "volk-hand4 active" })
                        this.setState({ num: "volk2 active" })
                    } else
                        if (x === "RD" || x === "RD1") {
                            this.setState({ numh: "volk-hand3 active" })
                            this.setState({ num: "volk2 active" })
                        }
        }
    }

    nextAcceleration() {
        if (this.state.score !== 0) {
            if (this.state.score % 10 === 0) {
                // alert("fdsdkbfhkac")
                this.setState({ speedEgg: this.state.speedEgg - 15 });
                this.setState({ respaunEgg: this.state.respaunEgg - 50 });
            }
        }
    }

    //Функция движения яйца по позициям



    loser() {
        if (this.state.loss !== 120) {
            this.setState({ loss: this.state.loss + 40 })
        }
    }

    loss(x) {
        let config = {
            width: x,
        }

        return (
            <div className="loss" style={config} />
        )
    }

    ///////////////////////////// 
    //Использование клавиатуры (кнопки 2,4,6,8 на numpad)
    checkKey = (event) => {
        switch (event.keyCode) {
            case 65:
                this.setState({ num: "volk1 active" });
                this.left()
                break;
            case 68:
                this.setState({ num: "volk2 active" });
                this.right()
                break;
            case 87:
                this.up()
                break;
            case 83:
                this.down()
                break;
            default:
                break;
        }

    }

    left() {
        if (this.state.numh === "volk-hand4 active") {
            this.setState({ numh: "volk-hand2 active" });
        }
        if (this.state.numh === "volk-hand3 active") {
            this.setState({ numh: "volk-hand1 active" });
        }

    }

    right() {
        if (this.state.numh === "volk-hand1 active") {
            this.setState({ numh: "volk-hand3 active" });
        }
        if (this.state.numh === "volk-hand2 active") {
            this.setState({ numh: "volk-hand4 active" });
        }

    }

    up() {
        if (this.state.num === "volk1 active") {
            this.setState({ numh: "volk-hand2 active" });
        }
        if (this.state.num === "volk2 active") {
            this.setState({ numh: "volk-hand4 active" });
        }
    }

    down() {
        if (this.state.num === "volk1 active") {
            this.setState({ numh: "volk-hand1 active" });
        }
        if (this.state.num === "volk2 active") {
            this.setState({ numh: "volk-hand3 active" });
        }
    }

    ///////////////////////////
    //Функция рендера волка при клике на кнопки интерфейса
    renderWolf(i) {
        switch (i.target.id) {
            case "1":
                this.setState({ num: "volk1 active" });
                this.setState({ numh: "volk-hand2 active" });
                break;
            case "2":
                this.setState({ num: "volk1 active" });
                this.setState({ numh: "volk-hand1 active" });
                break;
            case "3":
                this.setState({ num: "volk2 active" });
                this.setState({ numh: "volk-hand4 active" });
                break;
            case "4":
                this.setState({ num: "volk2 active" });
                this.setState({ numh: "volk-hand3 active" });
                break;
            default:
                break;
        }

    }

    render() {
        Howler.volume(0.1)
        let classname1 = this.state.LU;
        let classname2 = this.state.LD;
        let classname3 = this.state.RU;
        let classname4 = this.state.RD;

        let classname11 = this.state.LU1;
        let classname22 = this.state.LD1;
        let classname33 = this.state.RU1;
        let classname44 = this.state.RD1;

        let num = this.state.num;
        let numh = this.state.numh;
        let wolk = <div className={num} />;
        let wolkHand = <div className={numh} />

        let score = this.state.score;
       

        return (
            <>
                <div className="wraper">
                    <div id = "1" className="btn_startA" onClick={this.clickGameA} />
                    <div id = "2" className="title_btn_startA">игра А</div>
                    <div className="btn_startB" onClick={this.clickGameB} />
                    <div className="title_btn_startB">игра Б</div>
                    <div className="btn_time" onClick={this.mainStart} />
                    <div className="title_btn_time">время</div>
                    <div className={classname1} />
                    <div className={classname2} />
                    <div className={classname3} />
                    <div className={classname4} />
                    <div className={classname11} />
                    <div className={classname22} />
                    <div className={classname33} />
                    <div className={classname44} />

                    <div className="score">
                        {score}
                    </div>

                    {/* <div className="mistakes">
                        {mistakes}
                    </div> */}
                    {/* {this.RenderNewButton()} */}

                    {/* {this.time} */}
                    {this.loss(this.state.loss)}
                    <EggsNone />
                    {wolk}
                    {wolkHand}

                    <button id="1" onClick={this.renderWolf} className="btn btn-left-up" />
                    <button id="2" onClick={this.renderWolf} className="btn btn-left-down" />
                    <button id="3" onClick={this.renderWolf} className="btn btn-right-up" />
                    <button id="4" onClick={this.renderWolf} className="btn btn-right-down" />
                    <div className="rectangle1" />
                    <div className="rectangle2" />
                    <div className="rectangle3" />
                    <div className="rectangle4" />
                </div>
            </>
        )
    }
}


