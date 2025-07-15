import React from "react";
import { Component } from "react/cjs/react.production.min";
import Eggs from "../eggsActions/eggsAction";
import Volk from "../volk";
import "../volk/volk.css";
import github from "../img/github.png";
import vk from "../img/vk.png";
import styled, { keyframes } from 'styled-components';
import { rotateInDownRight, rotateInUpRight, flash } from 'react-animations';
import axios from "axios";
import BackgrounSide from "./backgroundSide/backgroundSide";





export default class Display extends Component {
    constructor() {
        super();
        this.state = {
            classNameForRightArrow: "arrow right_arrow ",
            classNameForDownArrow: "arrow down_arrow ",
            classNameForLeftArrow: "arrow left_arrow ",
            classNameForFooter: "footer none",
            modalhelp: "modalhelp none",
            back: "back",
            ikonModalHelp: "help",
            classNameForRecordsTable: "highScoreTable none",
            classNameForWrapper: "wrapper",
            display: "display",
            module: "module",
            isDisplay: true,
            user: localStorage.getItem('Пользователь'),
            record: localStorage.getItem('Рекорд'),
            loop: localStorage.getItem('Полный этап'),
            value: '',
            valueOld: '',
            persons: [],
            isDisplayOn:false


        };
        this.toggleClasses = this.toggleClasses.bind(this);
        this.modalhelp = this.modalhelp.bind(this);
        this.renderRecords = this.renderRecords.bind(this);
        this.allRecords = this.allRecords.bind(this);
        this.createNewScore = this.createNewScore.bind(this);
        this.updateLeaderboard = this.updateLeaderboard.bind(this);
        this.toggleLid = this.toggleLid.bind(this);
        
        this.textInput = React.createRef();


    }

    componentDidMount() {
        this.updateLeaderboard()
    }

    updateLeaderboard() {
        axios.get(`/api/score`)
            .then(res => {
                const resdata = res.data;
                this.setState({ persons: resdata });
            })
    }

    async createNewScore() {
        const scoreObj = {
            username: localStorage.getItem('Пользователь'),
            score: localStorage.getItem('Рекорд'),
            loop: localStorage.getItem('Полный этап')
        }

        const response = await axios.post('/api/score', scoreObj);
        console.log(response.data)
        this.updateLeaderboard()
    }


    allRecords() {
        // let prss = this.state.persons
        // console.log(prss)
        let allRecords = this.state.persons.map(item =>
            <div className="newUserRecord">
                <div className="userName"><span>{item.username}</span></div>
                <div className="userScore">{item.score}</div>
                <div className="userLoop">{item.loop}</div>
            </div>
        )
        return (
            <ul>{allRecords}</ul>
        )
    }

    recordUpdate = () => {
        this.setState({
            user: localStorage.getItem('Пользователь'),
            record: localStorage.getItem('Рекорд'),
            loop: localStorage.getItem('Полный этап')
        })
        console.log('dasna')
        this.updateLeaderboard()
    }

    modalhelp() {
        if (this.state.modalhelp === "modalhelp none") {
            this.setState({ modalhelp: "modalhelp " })
            this.setState({ ikonModalHelp: "offModalHelp " })
            this.setState({ classNameForWrapper: "none" })
        } else {
            this.setState({ modalhelp: "modalhelp none" })
            this.setState({ classNameForWrapper: "wrapper" })
            this.setState({ ikonModalHelp: "help " })
        }
    }

    textInModalHelp() {
        return (
            <h2>
                <h1><p>Описание игры</p></h1>
                <p>
                    Пожалуй, это была самая популярная электронная игра в СССР!
                    Четыре курицы, сидящие на насестах, несут яйца, скатывающиеся вниз по четырём лоткам.
                    Управляя Волком, который может принимать четыре положения (напротив каждого лотка), требуется наловить как можно больше яиц в корзину.
                    За каждое пойманное яйцо игроку добавляется по одному очку. Сначала яйца катятся медленно, но постепенно темп игры ускоряется.
                    После набора каждой целой сотни очков темп игры немного замедляется.
                </p>

                <h1><p>Режимы игры</p></h1>
                <p>Игра имеет две степени сложности, вызываемые соответственно кнопками «Игра А» и «Игра Б», расположенными в правом верхнем углу игры.
                    Игра А означает, что яйца начинают катиться только по трём лоткам одновременно, в Игре Б — по всем четырём с увеличенной скоростью. Неиспользуемый лоток в Игре А зависит от количества штрафных очков: при 0 очков не используется нижний левый лоток, при 0,5 и 1 штрафном очке — нижний правый лоток, при 1,5 и 2 штрафных очках — верхний левый лоток, а при 2,5 штрафных очках — верхний правый лоток.
                    При аннулировании штрафных очков незадействованный лоток меняется на нижний левый, как при 0 штрафных очков, как только по нему скатываются все яйца. Под двумя кнопками запуска игры находится кнопка «Время» для переключения из игрового режима в режим показаний времени.</p>
                <h1><p>Управление</p></h1>
                <p>Используйте кнопки на приставке или клавиатурные клавищи wasd для перемещения волка. </p>

                {/* <div className="wasd" /> */}
                <h1><p>Интерактив</p></h1>
                <p>При нажатии на левую стрелку вызывается таблица рекордов. Таблица поделена на две части: рекорд игрока и все сохраненные рекорды.
                    При наборе играком большего числа очков, чем в прошлый раз, значение в части с рекордом игрока меняется.
                    После записи имени игрока появляется возможность сохранить рекорд (при сохранении рекорд переносится в список всех рекордов, заменить или удалить уже выложенный рекорд нельзя.) нажав на иконку сохранения.
                    Также присутствует возможность удаления ещё не выложенной информации о игроке (его рекорда).
                </p>
                <p>При нажатии на нижнюю стрелку приставка переворачивается обратной стороной. </p>
                <p>При нажатии на правую стрелку появляются ссылки на автора проекта. </p>

            </h2>
        )
    }

    toggleClasses(e) {
        switch (e.target.id) {
            case 'help':
                this.modalhelp()
                break;

            case 'rightArrow':
                this.presRightArrow()
                break;

            case 'downArrow':
                this.presDownArrow()
                break;

            case 'leftArrow':
                this.presLeftArrow()
                break;

            default:
                break;
        }
    }

    presRightArrow() {
        if (this.state.classNameForRightArrow === "arrow right_arrow ") {
            this.setState({ classNameForRightArrow: "arrow right_arrow rotatedRight" })
            this.setState({ classNameForFooter: "footer " })
        } else {
            this.setState({ classNameForRightArrow: "arrow right_arrow " })
            this.setState({ classNameForFooter: "footer none" })
        }
    }

    presLeftArrow() {

        if (this.state.classNameForLeftArrow === "arrow left_arrow ") {
            this.setState({ classNameForLeftArrow: "arrow left_arrow rotatedLeft" })
            this.setState({ classNameForRecordsTable: "highScoreTable classForSlideRight" })
        } else {
            this.setState({ classNameForLeftArrow: "arrow left_arrow " })
            this.setState({ classNameForRecordsTable: "highScoreTable classForSlideLeft" })
        }
    }

    presDownArrow() {
        if (this.state.classNameForDownArrow === "arrow down_arrow ") {
            this.setState({ classNameForDownArrow: "arrow down_arrow rotatedDown" })
            this.setState({ display: "display none" })
            this.setState({ module: "module none" })
            this.setState({ back: "none " })
            this.setState({ isDisplay: false })
        } else {
            this.setState({ classNameForDownArrow: "arrow down_arrow " })
            this.setState({ display: "display " })
            this.setState({ module: "module " })
            this.setState({ back: "back " })
            this.setState({ isDisplay: true })
        }
    }

    button1Click = () => {

        alert(this.textInput.current.value)
        if (this.textInput.current.value !== '' && this.state.valueOld !== this.textInput.current.value) {
            localStorage.setItem('Пользователь', this.textInput.current.value)
            alert(`Имя пользователя было изменено на ${this.textInput.current.value}, старое имя ${this.state.valueOld} `);
            this.state.valueOld = this.textInput.current.value
            this.textInput.current.value = ''

        } else alert("Поле заполнено не верно")
        this.recordUpdate()
    }



    renderRecords() {
        return (
            <>
                <div>
                    <div className="wrapperForPlayerRecord">
                        <p>ТВОЙ РЕКОРД</p>
                        <div className="newPlaerRecord">
                            <span id='name'>ИМЯ</span>
                            <button className="btnForChangeName" onClick={this.button1Click}>СМЕНИТЬ ИМЯ</button>
                            <span id='score'>ОЧКИ</span>
                            <span id='loop'>КРУГИ</span>
                            <input id="forUser" ref={this.textInput} type="text" className="userName" placeholder={this.state.user} maxLength={20} onChange={this.recordUpdate}></input>
                            <div id="forUser" className="userScore">{this.state.record}</div>
                            <div id="forUser" className="userLoop">{this.state.loop}</div>
                            <div className="iconSave" onClick={() => this.createNewScore()} />
                            <div className="iconDelete" onClick={() => {
                                localStorage.clear()
                                this.recordUpdate()
                            }} />
                        </div>

                    </div>
                    <div className="wrapperForAllRecords">
                        <p>ВСЕ РЕКОРДЫ</p>
                        {this.allRecords()}
                    </div>
                </div>
            </>
        )
    }

    toggleLid() {
        // this.setState({isDisplayOn: !this.state.isDisplayOn})
        this.setState({isDisplayOn: !this.state.isDisplayOn})
        console.log(this.state.isDisplayOn)
        console.log(this)
        // setTimeout(()=>this.setState({isDisplayOn: false}),3000)
        return(this.state.isDisplayOn)

    }



    render() {
        return (
            <>
                <div className={this.state.modalhelp}>
                    {this.textInModalHelp()}

                </div>
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>


                {/* {this.state.isDisplay && <div className={this.state.classNameForWrapper}> */}
                <div className={this.state.classNameForWrapper}>
                <BackgrounSide prop={this.state.isDisplay?"none":" "} onClick={this.toggleLid}/>
                    <div className={this.state.back}>
                        <div className={this.state.module}>
                            <div className="frame" />
                            <div className="title">НУ, ПОГОДИ!</div>
                            <div className="displayGlass">
                            </div>
                            <div className={this.state.display} >
                                {this.state.isDisplayOn&&<Volk toggleLid={this.state.isDisplayOn}/>}
                                <Eggs recordUpdate={this.recordUpdate} toggleLid={this.state.isDisplayOn}/>
                            </div>
                            <div className="title2">ЭЛЕКТРОНИКА</div>
                            <div className="LOGO" />
                            <div className="bell" />
                            <div className="clockFace" />
                        </div>
                    </div>
                </div>

                {/* {!this.state.isDisplay && <div className={this.state.classNameForWrapper}>
                    <BackgrounSide prop={this.state.isDisplay?" ":"none"} onClick={this.toggleLid}/>
                </div>} */}

                <div className={this.state.classNameForFooter}>
                    <RotateInDownRight><a href="https://github.com/GuliaevAE"><img src={github} alt="github" /></a></RotateInDownRight>
                    <RotateInUpRight><a href="https://vk.com/id114500556"><img src={vk} alt="github" /></a></RotateInUpRight>
                </div>
                <div className={this.state.classNameForRecordsTable}>

                    {this.renderRecords()}
                </div>
                <Swing><div id="help" className={this.state.ikonModalHelp} onClick={this.toggleClasses} /></Swing>
                <div id="rightArrow" className={this.state.classNameForRightArrow} onClick={this.toggleClasses} />
                <div id="downArrow" className={this.state.classNameForDownArrow} onClick={this.toggleClasses} />
                <div id="leftArrow" className={this.state.classNameForLeftArrow} onClick={this.toggleClasses} />
            </>
        )
    }
}

const RotateInDownRight = styled.div`animation: 1s ${keyframes`${rotateInDownRight}`}`;
const RotateInUpRight = styled.div`animation: 1s ${keyframes`${rotateInUpRight}`}`;
const Swing = styled.div`animation: 3s ${keyframes`${flash}`} infinite`;