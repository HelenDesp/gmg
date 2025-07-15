import React, { Component } from "react";
import EggsNone from "../eggs";
import "./eggsActions.css";
import actEggSound from "../sounds/bit-pong-sound.mp3";
import hitEgg from "../sounds/bit-punch.mp3";
import crash from "../sounds/crash.mp3";
import { Howl, Howler } from "howler";


export default class EggsActions extends Component {
    #activeInterval;

    constructor(props) {
        super(props);
        this.state = {
            abilityToRenderLeftUpEgg: true,
            abilityToRenderLeftDownEgg: true,
            abilityToRenderRightUpEgg: true,
            abilityToRenderRightDownEgg: true,
            abilityToRenderLeftUpEggSecond: true,
            abilityToRenderLeftDownEggSecond: true,
            abilityToRenderRightUpEggSecond: true,
            abilityToRenderRightDownEggSecond: true,
            classnameForLU: 'egg LU1 noneEgg ',
            classnameForLD: 'egg LD1 noneEgg ',
            classnameForRU: 'egg RU1 noneEgg ',
            classnameForRD: 'egg RD1 noneEgg ',
            classnameForLUSecond: 'egg LU1 noneEgg ',
            classnameForLDSecond: 'egg LD1 noneEgg ',
            classnameForRUSecond: 'egg RU1 noneEgg ',
            classnameForRDSecond: 'egg RD1 noneEgg ',
            speedEgg: 5000,
            respawnEgg: 5000,
            wolfPosition: "volk1 active none",
            wolfBascetPosition: "volk-hand2 active none",
            brokenEggLeft: "brokenEggLeft noneEgg",
            brokenEggRight: "brokenEggRight noneEgg",
            isGameStarted: false,
            isGameSwitched: false,
            score: 0,
            mistakes: 0,
            loss: 0,
            acceleration: 0,
            loop: 0,
            theGameStarted: "",
            theGameStartedClass: "none",
            arrayWithNumbers: [],
            canPlay: false,
            classnameForRabbit: 'rabbit none'
        };
        this.generateEgg = this.generateEgg.bind(this);
        this.beginA = this.beginA.bind(this);
        this.beginB = this.beginB.bind(this);
        this.renderRandomEgg = this.renderRandomEgg.bind(this);
        this.renderWolf = this.renderWolf.bind(this);
        this.checkPos = this.checkPos.bind(this);
        this.loss = this.loss.bind(this);
        this.time = this.time.bind(this);
        this.eggCaught = this.eggCaught.bind(this);
        this.newRecord = this.newRecord.bind(this);



    }

    soundPlay = (src) => {
        const sound = new Howl({
            src
        })
        sound.play()
    }

    /////////////////////////////////////////////
    componentDidMount() {

        document.addEventListener("keydown", this.checkKey);

    }

    componentDidUpdate() {
        if (this.props.toggleLid && !this.state.canPlay) {
            this.setState({
                wolfPosition: "volk1 active",
                wolfBascetPosition: "volk-hand2 active",
            })

            this.setState({ canPlay: true })
        }
        if (!this.props.toggleLid && this.state.canPlay) {
            console.log(this.props.toggleLid, this.state.canPlay)
            this.fullreset()
            this.setState({ canPlay: false })
        }

        if (this.state.loss >= 120) {
            setTimeout(() => this.setState({ loss: 0 }), 4000);
        }
    }

    //////////////////////////////////////////////////////
    ///////Проверка свободной позиции для рендеринга яйца
    checkPos() {
        if (this.state.theGameStarted === "gameA") {
            if ((this.state.abilityToRenderLeftUpEgg === true || this.state.abilityToRenderLeftUpEggSecond === true) && (this.state.mistakes !== 1.5 || this.state.mistakes !== 2)) {
                this.generateEgg("LU", "classnameForLU", "abilityToRenderLeftUpEgg")
            } else if ((this.state.abilityToRenderLeftDownEgg === true || this.state.abilityToRenderLeftDownEggSecond === true) && this.state.mistakes !== 0) {
                this.generateEgg("LD", "classnameForLD", "abilityToRenderLeftDownEgg")
            } else if ((this.state.abilityToRenderRightUpEgg === true || this.state.abilityToRenderRightUpEggSecond === true) && this.state.mistakes !== 2.5) {
                this.generateEgg("RU", "classnameForRU", "abilityToRenderRightUpEgg")
            } else if ((this.state.abilityToRenderRightDownEgg === true || this.state.abilityToRenderRightDownEggSecond === true) && (this.state.mistakes !== 0.5 || this.state.mistakes !== 1)) {
                this.generateEgg("RD", "classnameForRD", "abilityToRenderRightDownEgg")
            }
        } else {
            if (this.state.abilityToRenderLeftUpEgg === true || this.state.abilityToRenderLeftUpEggSecond === true) {
                this.generateEgg("LU", "classnameForLU", "abilityToRenderLeftUpEgg")
            } else if (this.state.abilityToRenderLeftDownEgg === true || this.state.abilityToRenderLeftDownEggSecond === true) {
                this.generateEgg("LD", "classnameForLD", "abilityToRenderLeftDownEgg")
            } else if (this.state.abilityToRenderRightUpEgg === true || this.state.abilityToRenderRightUpEggSecond === true) {
                this.generateEgg("RU", "classnameForRU", "abilityToRenderRightUpEgg")
            } else if (this.state.abilityToRenderRightDownEgg === true || this.state.abilityToRenderRightDownEggSecond === true) {
                this.generateEgg("RD", "classnameForRD", "abilityToRenderRightDownEgg")
            }
        }

    }

    start() {
        this.#activeInterval = setInterval(() => {
            this.renderRandomEgg();

            if (this.state.theGameStarted === "time") {
                let date = new Date(),
                    hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
                    minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();

                this.setState({ score: [hours, ":", minutes] })
            }

            if (this.state.loss >= 120 || this.state.mistakes >= 3) {
                this.newRecord()
                clearInterval(this.#activeInterval);
            }
        }, this.state.respaunEgg);
    }

    newRecord() {
        if (this.state.score > localStorage.getItem('Рекорд')) {
            // alert(this.state.score)
            localStorage.setItem('Рекорд', this.state.score);
            localStorage.setItem('Полный этап', this.state.loop)
            this.props.recordUpdate()
        }
    }

    /////////////////////////////////////////////
    ///Функция генерации яиц с определенным интервалом
    beginA() {
        if (this.props.toggleLid) {
            this.reset();
            this.setState({ theGameStarted: "gameA" });
            this.setState({ theGameStartedClass: "theGameAStarted" })
            this.state.speedEgg = 350;
            this.state.respaunEgg = 500;
            this.start();
        }
    }

    beginB() {
        if (this.props.toggleLid) {
            this.reset();
            this.setState({ theGameStarted: "gameB" });
            this.setState({ theGameStartedClass: "theGameBStarted" })
            this.state.speedEgg = 350;
            this.state.respaunEgg = 500;
            this.start();
        }
    }

    time() {
        if (this.props.toggleLid) {
            this.reset();
            this.state.speedEgg = 400;
            this.state.respaunEgg = 400;
            this.setState({ theGameStarted: "time" });
            this.start();
        }
    }


    fullreset() {
        this.setState({
            wolfPosition: "volk1 active none",
            wolfBascetPosition: "volk-hand2 active none",
        })
        this.reset()
    }
    reset() {
        clearInterval(this.#activeInterval);
        this.setState({
            score: 0,
            mistakes: 0,
            loop: 0,
            loss: 0,
            theGameStarted: '',
            theGameStartedClass: 'none',
            abilityToRenderLeftUpEgg: true,
            abilityToRenderLeftDownEgg: true,
            abilityToRenderRightUpEgg: true,
            abilityToRenderRightDownEgg: true,
            abilityToRenderLeftUpEggSecond: true,
            abilityToRenderLeftDownEggSecond: true,
            abilityToRenderRightUpEggSecond: true,
            abilityToRenderRightDownEggSecond: true,

            isGameSwitched: true,
            classnameForLU: 'egg LU1 noneEgg ',
            classnameForLD: 'egg LD1 noneEgg',
            classnameForRU: 'egg RU1 noneEgg',
            classnameForRD: 'egg RD1 noneEgg',
            classnameForLUSecond: 'egg LU1 noneEgg ',
            classnameForLDSecond: 'egg LD1 noneEgg',
            classnameForRUSecond: 'egg RU1 noneEgg',
            classnameForRDSecond: 'egg RD1 noneEgg',
        });
    }

    generatePossibleEgg(eggLocation, classnameForEgg, abilityToRender) {
        if (this.state[abilityToRender] || this.state[abilityToRender + "Second"]) {
            this.generateEgg(eggLocation, classnameForEgg, abilityToRender)
        } else if (this.state[abilityToRender] === false && this.state[abilityToRender + "Second"] === false) {
            this.checkPos()
        }
    }

    ///////////////////////////////////////////
    //Функция генерации рандомного числа
    randomInteger() {

        if (this.state.theGameStarted === "gameA") {

            this.state.arrayWithNumbers = [1, 3, 4];

            if (this.state.mistakes === 0.5 || this.state.mistakes === 1) {
                this.state.arrayWithNumbers = [1, 2, 3]
            }

            if (this.state.mistakes === 1.5 || this.state.mistakes === 2) {
                this.state.arrayWithNumbers = [2, 3, 4]
            }

            if (this.state.mistakes === 2.5) {
                this.state.arrayWithNumbers = [4, 2, 1]
            }

        } else this.state.arrayWithNumbers = [1, 2, 3, 4]
        const randomElement = this.state.arrayWithNumbers[Math.floor(Math.random() * this.state.arrayWithNumbers.length)];
        return randomElement;
    }

    /////////////////////////////////////////////////
    //Функция рендера случайного яйца
    renderRandomEgg() {
        let num = this.randomInteger();

        switch (num) {
            case 1:
                this.generatePossibleEgg("LU", "classnameForLU", "abilityToRenderLeftUpEgg")
                break;
            case 2:
                this.generatePossibleEgg("LD", "classnameForLD", "abilityToRenderLeftDownEgg")
                break;
            case 3:
                this.generatePossibleEgg("RU", "classnameForRU", "abilityToRenderRightUpEgg")
                break;
            case 4:
                this.generatePossibleEgg("RD", "classnameForRD", "abilityToRenderRightDownEgg")
                break;
            default:
                break;
        }
    }

    generateEgg(eggLocation, classnameForEgg, abilityToRender) {
        if (this.state.mistakes < 3) {
            if (this.state[abilityToRender] === false && this.state[abilityToRender + "Second"] === true) {

                classnameForEgg += "Second";
                abilityToRender += "Second";

            }

            this.moveEgg(classnameForEgg, abilityToRender, eggLocation);
        } else {
            return;
        }
    }

    ///////////////////////////////////////////////
    //Функция движения яйца по позициям
    moveEgg(classnameForEgg, abilityToRender, eggLocation) {
        let self = this;
        if (!this.state.isGameStarted) {
            this.setState({
                isGameStarted: true,
                isGameSwitched: false
            });
        }

        if (this.state.mistakes < 3 && !this.state.isGameSwitched) {
            let timer = setTimeout(function makeEggStep(positionNumber = 1) {
                let currentPositionNumber = positionNumber;

                if (self.state.isGameSwitched) {
                    clearTimeout(timer);
                    return
                }
                if (self.state.mistakes >= 3 || currentPositionNumber === 6) {
                    self.setState({ [classnameForEgg]: `egg ${eggLocation}1 noneEgg` });
                    self.setState({ [abilityToRender]: true });
                    clearTimeout(timer);

                    return
                }

                self.setState({ [classnameForEgg]: `egg ${eggLocation}${currentPositionNumber} activeEgg` });

                if (currentPositionNumber === 1) {
                    self.setState({ [abilityToRender]: false });
                }

                if (self.state.theGameStarted !== "time") {
                    self.soundPlay(actEggSound)
                }

                if (currentPositionNumber === 5) {
                    if (self.state.theGameStarted === "time") {
                        setTimeout(() => self.checkScoreOrMistakeInAutoPlay(classnameForEgg, eggLocation), self.state.speedEgg * 0.5)
                    } else {
                        setTimeout(() => self.checkScoreOrMistake(classnameForEgg, eggLocation), self.state.speedEgg * 0.5)
                    }
                }

                timer = setTimeout(makeEggStep, self.state.speedEgg, currentPositionNumber + 1);
            }, this.state.speedEgg);
        } else {

            self.setState({ isGameSwitched: false });

            return;
        }
    }

    eggCaught() {
        this.soundPlay(hitEgg)
        this.setState({ score: this.state.score + 1 })

        this.nextAcceleration()

        if (this.state.score === 999) {
            this.setState({ loop: this.state.loop += 1 })
            this.setState({ score: 0 })
        }
    }

    //////////////////////////////////////////
    //Проверка успеха или ошибки
    checkScoreOrMistake(classnameForEgg, eggLocation) {
        if (this.state[classnameForEgg] === `egg ${eggLocation}5 activeEgg`) {
            if ((classnameForEgg === "classnameForLU" || classnameForEgg === "classnameForLUSecond") && this.state.wolfBascetPosition === "volk-hand2 active") {
                this.eggCaught()
            } else
                if ((classnameForEgg === "classnameForLD" && this.state.wolfBascetPosition === "volk-hand1 active") || (classnameForEgg === "classnameForLDSecond" && this.state.wolfBascetPosition === "volk-hand1 active")) {
                    this.eggCaught()
                } else
                    if ((classnameForEgg === "classnameForRU" && this.state.wolfBascetPosition === "volk-hand4 active") || (classnameForEgg === "classnameForRUSecond" && this.state.wolfBascetPosition === "volk-hand4 active")) {
                        this.eggCaught()
                    } else
                        if ((classnameForEgg === "classnameForRD" && this.state.wolfBascetPosition === "volk-hand3 active") || (classnameForEgg === "classnameForRDSecond" && this.state.wolfBascetPosition === "volk-hand3 active")) {
                            this.eggCaught()
                        } else {
                            if (eggLocation === "RU" || eggLocation === "RD") {
                                setTimeout(() => this.setState({ brokenEggRight: "brokenEggRight" }), this.state.speedEgg * 0.5)
                                setTimeout(() => this.setState({ brokenEggRight: "brokenEggRight noneEgg" }), this.state.speedEgg * 1.5)
                            } else {
                                setTimeout(() => this.setState({ brokenEggLeft: "brokenEggLeft" }), this.state.speedEgg * 0.5)
                                setTimeout(() => this.setState({ brokenEggLeft: "brokenEggLeft noneEgg" }), this.state.speedEgg * 1.5)
                            }

                            this.loser()
                            if (this.state.theGameStarted === "gameA" && this.state.classnameForRabbit === "rabbit") {
                                this.setState({ mistakes: this.state.mistakes + 0.5 })
                            } else { this.setState({ mistakes: this.state.mistakes + 1 }) }

                        }
        }

        if (this.state.score % 15 === 0 && this.state.theGameStarted === "gameA") {
            setTimeout(() => this.setState({ classnameForRabbit: "rabbit" }), 500)
            setTimeout(() => this.setState({ classnameForRabbit: "rabbit none" }), 2000)
        }

    }

    checkScoreOrMistakeInAutoPlay(classnameForEgg, eggLocation) {
        if (this.state[classnameForEgg] === `egg ${eggLocation}5 activeEgg`) {
            if (classnameForEgg === "classnameForLU" || classnameForEgg === "classnameForLUSecond") {
                this.setState({ wolfBascetPosition: "volk-hand2 active" })
                this.setState({ wolfPosition: "volk1 active" })

            } else
                if (classnameForEgg === "classnameForLD" || classnameForEgg === "classnameForLDSecond") {
                    this.setState({ wolfBascetPosition: "volk-hand1 active" })
                    this.setState({ wolfPosition: "volk1 active" })
                } else
                    if (classnameForEgg === "classnameForRU" || classnameForEgg === "classnameForRUSecond") {
                        this.setState({ wolfBascetPosition: "volk-hand4 active" })
                        this.setState({ wolfPosition: "volk2 active" })
                    } else
                        if (classnameForEgg === "classnameForRD" || classnameForEgg === "classnameForRDSecond") {
                            this.setState({ wolfBascetPosition: "volk-hand3 active" })
                            this.setState({ wolfPosition: "volk2 active" })
                        }
        }
    }

    nextAcceleration() {
        if (this.state.score !== 0 && this.state.score % 15 === 0) {
            this.setState({ speedEgg: this.state.speedEgg - 20 });
            this.setState({ respaunEgg: this.state.respaunEgg - 35 });
        }

        if (this.state.score === 200 || this.state.score === 500) {
            this.setState({ mistakes: 0 });
            this.setState({ loss: 0 });
        }
    }

    loser() {
        if (this.state.loss < 120) {
            this.soundPlay(crash)
            if (this.state.theGameStarted === "gameA") {
                this.setState({ loss: this.state.loss + 20 })
            } else this.setState({ loss: this.state.loss + 40 })
        }
    }

    loss(x) {
        let config = {
            width: x * 40,
            "max-width": 120,
        }

        return (
            <div className="loss" style={config} />
        )
    }

    ///////////////////////////// 
    //Использование клавиатуры (кнопки w,a,s,d на numpad)
    checkKey = (event) => {
        if (this.props.toggleLid) {
            switch (event.keyCode) {
                case 65:
                    this.setState({ wolfPosition: "volk1 active" });
                    this.left()
                    break;
                case 68:
                    this.setState({ wolfPosition: "volk2 active" });
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


    }

    left() {

        if (this.state.wolfBascetPosition === "volk-hand4 active") {
            this.setState({ wolfBascetPosition: "volk-hand2 active" });
        }
        if (this.state.wolfBascetPosition === "volk-hand3 active") {
            this.setState({ wolfBascetPosition: "volk-hand1 active" });
        }

    }

    right() {
        if (this.state.wolfBascetPosition === "volk-hand1 active") {
            this.setState({ wolfBascetPosition: "volk-hand3 active" });
        }
        if (this.state.wolfBascetPosition === "volk-hand2 active") {
            this.setState({ wolfBascetPosition: "volk-hand4 active" });
        }
    }

    up() {
        if (this.state.wolfPosition === "volk1 active") {
            this.setState({ wolfBascetPosition: "volk-hand2 active" });
        }
        if (this.state.wolfPosition === "volk2 active") {
            this.setState({ wolfBascetPosition: "volk-hand4 active" });
        }
    }

    down() {
        if (this.state.wolfPosition === "volk1 active") {
            this.setState({ wolfBascetPosition: "volk-hand1 active" });
        }
        if (this.state.wolfPosition === "volk2 active") {
            this.setState({ wolfBascetPosition: "volk-hand3 active" });
        }
    }

    ///////////////////////////
    //Функция рендера волка при клике на кнопки интерфейса
    renderWolf(buttonNumber) {
        if (this.props.toggleLid) {
            switch (buttonNumber.target.id) {
                case "1":
                    this.setState({ wolfPosition: "volk1 active" });
                    this.setState({ wolfBascetPosition: "volk-hand2 active" });
                    break;
                case "2":
                    this.setState({ wolfPosition: "volk1 active" });
                    this.setState({ wolfBascetPosition: "volk-hand1 active" });
                    break;
                case "3":
                    this.setState({ wolfPosition: "volk2 active" });
                    this.setState({ wolfBascetPosition: "volk-hand4 active" });
                    break;
                case "4":
                    this.setState({ wolfPosition: "volk2 active" });
                    this.setState({ wolfBascetPosition: "volk-hand3 active" });
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        Howler.volume(0.1)
        return (
            <>
                <div className="wraper">
                    <div className="btn_startA" onClick={this.beginA} />
                    <div className="title_btn_startA">игра А</div>
                    <div className="btn_startB" onClick={this.beginB} />
                    <div className="title_btn_startB">игра Б</div>
                    <div className="btn_time" onClick={this.time} />
                    <div className="title_btn_time">время</div>
                    <div className={this.state.classnameForLU} />
                    <div className={this.state.classnameForLD} />
                    <div className={this.state.classnameForRU} />
                    <div className={this.state.classnameForRD} />
                    <div className={this.state.classnameForLUSecond} />
                    <div className={this.state.classnameForLDSecond} />
                    <div className={this.state.classnameForRUSecond} />
                    <div className={this.state.classnameForRDSecond} />
                    <div className="score">
                        {this.props.toggleLid && this.state.score}
                    </div>
                    <div className={this.state.theGameStartedClass}></div>
                    <div className={this.state.brokenEggLeft} />
                    <div className={this.state.brokenEggRight} />
                    {this.loss(this.state.mistakes)}
                    {this.props.toggleLid && <EggsNone toggleLid={this.props.toggleLid} />}
                    <div className={this.state.classnameForRabbit} />
                    <div className={this.state.wolfPosition} />
                    <div className={this.state.wolfBascetPosition} />
                    <button id="1" onClick={this.renderWolf} className="btn btn-left-up" />
                    <button id="2" onClick={this.renderWolf} className="btn btn-left-down" />
                    <button id="3" onClick={this.renderWolf} className="btn btn-right-up" />
                    <button id="4" onClick={this.renderWolf} className="btn btn-right-down" />
                    <div className="triangle1" />
                    <div className="triangle2" />
                    <div className="triangle3" />
                    <div className="triangle4" />
                </div>
            </>
        )
    }
}

