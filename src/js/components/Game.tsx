import React from "react";
import Keyboard, { CMD_BTNS, keyboardLayout } from "./Keyboard";
import Row from "./Row";
import Replay from "./Replay"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { db } from "../db";
 

enum GameState {
    WIN,
    LOSE,
    IN_PROGRESS
}

export enum RowLetterStatus {
    CORRECT = 3,
    ELSEWHERE = 2,
    ABSENT = 1,
    DEFAULT = 0
}

export interface RowLetter {
    letter: string|null,
    status: RowLetterStatus
}

type Props = Record<string, never>

type State = {
    grid: RowLetter[][],
    colPointer: number,
    nextRowPointer: number,
    gameState: GameState,
    wordToGuess: string
}

const TOASTS: Record<string, string> = {
    invalidWord: '😬 Not in dictionary.',
    [GameState.WIN]: '👑 You win!',
    [GameState.LOSE]: '😔 You lose, the word is '
}

export default class Game extends React.Component<Props, State> {
    COLS_COUNT = 6
    ROW_MAX_LETTERS = 5

    constructor(props: Props) {
        super(props)

        this.state = {
            grid: this.initGrid(this.COLS_COUNT, this.ROW_MAX_LETTERS),
            colPointer: 0,
            nextRowPointer: 0,
            gameState: GameState.IN_PROGRESS,
            wordToGuess: ''
        }

        this.appendLetter = this.appendLetter.bind(this)
        this.removeLetter = this.removeLetter.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
        this.handleKeyboard = this.handleKeyboard.bind(this)
        this.startGame = this.startGame.bind(this)
    }

    componentDidMount(): void {
        this.setRandomWordToGuess()

        document.addEventListener('keydown', this.handleKeyboard)
    }

    handleKeyboard(e: KeyboardEvent): void {
        const commandButtonHandlers = this.commandButtonHandlers()

        if (keyboardLayout.flat().includes(e.key)){
            if (Object.values<string>(CMD_BTNS).includes(e.key)) {
                commandButtonHandlers[e.key as CMD_BTNS]()
            } else {
                this.appendLetter(e.key)
            }
        }
    }

    componentWillUnmount(): void {
        document.removeEventListener('keydown', this.handleKeyboard)
    }

    initGrid(colsCount: number, rowsCount: number): RowLetter[][] {
        return Array(colsCount).fill(0).map(() => {
            return Array(rowsCount).fill(0).map(() => {
                return {
                    letter: null,
                    status: RowLetterStatus.DEFAULT
                }
            })
        })
    }

    startGame() {
        this.setRandomWordToGuess()

        this.setState({
            grid: this.initGrid(this.COLS_COUNT, this.ROW_MAX_LETTERS),
            colPointer: 0,
            nextRowPointer: 0,
            gameState: GameState.IN_PROGRESS,
            wordToGuess: ''
        })
    }

    render() {
        return (
            <>
            <div className="flex flex-col">
                {this.state.grid.map((rowLetters: RowLetter[], i: number) => {
                    return <Row key={i} rowLetters={rowLetters}></Row>;
                })}
            </div>

            {this.state.gameState === GameState.IN_PROGRESS &&
            <Keyboard handleAppendLetter={this.appendLetter} commandButtonsHandlers={this.commandButtonHandlers()} submittedRows={this.getSubmittedRows()} />}

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                closeOnClick
                theme="dark"
            />

            {this.state.gameState === GameState.LOSE &&
            <Replay
                handleReplay={this.startGame} 
                heading={{
                        text: TOASTS[GameState.LOSE] + this.state.wordToGuess,
                        className: "text-red-600"
                    }}
            />}

            {this.state.gameState === GameState.WIN &&
            <Replay
                handleReplay={this.startGame} 
                heading={{
                        text: TOASTS[GameState.WIN],
                        className: "text-green-600"
                    }}
                button={{
                    className: "bg-green-500 hover:bg-green-600 focus:bg-green-700"
                }}
            />}
            </>
        )
    }

    async randomWordFromDB(length: number): Promise<string> {
        const words = await db.words.where('length').equals(length).toArray()
    
        return words[Math.floor(Math.random() * words.length)].value
    }

    async setRandomWordToGuess() {
        this.setState({ wordToGuess: await this.randomWordFromDB(this.ROW_MAX_LETTERS) })
    }

    commandButtonHandlers(): Record<CMD_BTNS, CallableFunction> {
        return {
            [CMD_BTNS.ENTER]: this.submitAnswer,
            [CMD_BTNS.BACKSPACE]: this.removeLetter
        };
    }

    appendLetter(letter: string): void {
        if (this.ROW_MAX_LETTERS > this.state.nextRowPointer) {
            const grid = [...this.state.grid]
            grid[this.state.colPointer][this.state.nextRowPointer].letter = letter

            this.setState({ grid, nextRowPointer: this.state.nextRowPointer + 1 })
        }
    }

    removeLetter(): void {
        if (this.state.nextRowPointer !== 0) {
            const grid: RowLetter[][] = [...this.state.grid]

            grid[this.state.colPointer][this.state.nextRowPointer - 1].letter = null

            this.setState({ grid, nextRowPointer: this.state.nextRowPointer - 1 })
        }
    }

    async submitAnswer(): Promise<void> {
        if (this.hasEmptyRows()) {
            return
        }

        if (! await this.isCorrectWord(this.getCurrentGuessLetters())) {
            toast(TOASTS.invalidWord)
            return
        }

        this.changeRowLettersStatuses()

        switch(this.determineGameStatus()) {
            case GameState.WIN:
                this.win()
                return
            case GameState.LOSE:
                this.lose()
                return
        }
        
        this.setState({ colPointer: this.state.colPointer + 1, nextRowPointer: 0 })
    }

    async isCorrectWord(word: string): Promise<boolean> {
        return !! await db.words.where('value').equals(word).first()
    }

    hasEmptyRows(): boolean {
        const rows = [...this.state.grid][this.state.colPointer]

        return rows.some((rL: RowLetter) => rL.letter === null)
    }

    getCurrentGuessLetters(): string {
        const rows = [...this.state.grid][this.state.colPointer]

        return rows.map((rL: RowLetter) => rL.letter).join('')
    }

    changeRowLettersStatuses() {
        const grid = [...this.state.grid]
        const rows = grid[this.state.colPointer]

        const wordToGuess = this.state.wordToGuess
        
        grid[this.state.colPointer] = rows.map((rL: RowLetter, i: number) => {
            const rowLetterStatus = rL.letter === wordToGuess[i]
                ? RowLetterStatus.CORRECT
                : wordToGuess.includes(rL.letter)
                    ? RowLetterStatus.ELSEWHERE
                    : RowLetterStatus.ABSENT

            return {...rL, status: rowLetterStatus}
        })

        this.setState({ grid })
    }

    determineGameStatus(): GameState {
        const guessWord = this.getCurrentGuessLetters()

        if (guessWord === this.state.wordToGuess) {
            return GameState.WIN
        }

        if (this.state.colPointer + 1 === this.COLS_COUNT) {
            return GameState.LOSE
        }

        return GameState.IN_PROGRESS
    }

    getSubmittedRows(): RowLetter[][] {
        return this.state.grid.filter((row: RowLetter[], i: number) => {
            return this.state.colPointer > i
        })
    }

    win() {
        this.setState({ gameState: GameState.WIN })
        toast(TOASTS[GameState.WIN])
    }

    lose() {
        this.setState({ gameState: GameState.LOSE })
        toast(TOASTS[GameState.LOSE] + this.state.wordToGuess)
    }
}