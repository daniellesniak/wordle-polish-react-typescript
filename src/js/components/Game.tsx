import React, { FC, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Row from "./Row"
import Keyboard from "./Keyboard"
import MessageBox from "./MessageBox"
import { db } from "../db"

const ROWS_NUMBER = 6

export enum GameStatus {
    WIN = 1,
    IN_PROGRESS = 0,
    LOSE = -1,
    WIN_LOSE = -11
}

type Props = {
    dbInitialized: boolean
}

const Game: FC<Props> = (props: Props) => {
    const [wordToGuess, setWordToGuess] = useState('')
    const wordToGuessLength = 5
    const [activeRowIndex, setActiveRowIndex] = useState(0)
    const [activeRowLetters, setActiveRowLetters] = useState([])
    const [guesses, setGuesses] = useState([])
    const [currentGameStatus, setCurrentGameStatus] = useState(GameStatus.IN_PROGRESS)

    if (! props.dbInitialized) {
        return <MessageBox message={'Initializing database'}></MessageBox>
    }

    if (wordToGuess === '') {
        (async() => {
            setWordToGuess(await getRandomWordFromDB(wordToGuessLength))
        })()
    }

    const determinedGameStatus = currentGameStatus === GameStatus.IN_PROGRESS ? determineGameStatus(guesses, wordToGuess, ROWS_NUMBER) : null
    
    if(determinedGameStatus === GameStatus.WIN) {
        setCurrentGameStatus(GameStatus.WIN)
        toast('👑 You win!')
    } else if (determinedGameStatus === GameStatus.LOSE) {
        setCurrentGameStatus(GameStatus.LOSE)
        toast('😔 You lost! The word was ' + wordToGuess)
    }

    const rows = Array(ROWS_NUMBER).fill(0).map((v, i: number) => {
        const isActiveRow = i === activeRowIndex
        
        return <Row
                    key={i}
                    isActiveRow={isActiveRow}
                    isLocked={! isActiveRow && activeRowIndex > i}
                    noOfLetters={wordToGuessLength}
                    letters={isActiveRow ? activeRowLetters : guesses[i]}
                    wordToGuessLetters={wordToGuess.split('')}
                />
    })

    return wordToGuess.length <= 0
                ? <MessageBox message="Loading..."></MessageBox>
                : (
                    <>
                        <div className="flex flex-col">
                            { rows }
                        </div>
                        
                        <Keyboard
                            activeRowIndex={activeRowIndex}
                            activeRowLetters={activeRowLetters}
                            noOfLettersAllowed={wordToGuessLength}
                            guesses={guesses}
                            wordToGuessLetters={wordToGuess.split('')}
                            currentGameStatus={currentGameStatus}
                            handleActiveRowIndexChange={setActiveRowIndex}
                            handleActiveRowLettersChange={setActiveRowLetters}
                            handleGuessesChange={setGuesses}
                        ></Keyboard>
                        
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            closeOnClick
                            theme="dark"
                        />
                    </>
                )
}

export default Game

export async function getRandomWordFromDB(length: number) {
    const words = await db.words
            .where('length')
            .equals(length)
            .toArray()
    
    return words[Math.floor(Math.random() * words.length)].value
}

export function determineGameStatus(guesses: Array<Array<string>>, wordToGuess: string, rowsLength: number) {
    if (guesses.map((g) => g.join('')).includes(wordToGuess)) {
        return GameStatus.WIN
    }

    if (guesses.length === rowsLength) {
        return GameStatus.LOSE
    }

    return GameStatus.IN_PROGRESS
}
