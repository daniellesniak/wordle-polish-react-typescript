import React, { FC } from "react"
import { Type, typeClasses } from "./Letter"
import { GameStatus } from "./Game"
import { db } from "../db"
import { useLiveQuery } from "dexie-react-hooks"
import { toast } from "react-toastify"

enum SPECIAL_BTNS {
    ENTER = 'enter',
    BACKSPACE = 'backspace'
}

const keyboardBtns =  [
    [
        'ą', 'ć', 'ę', 'ń', 'ó', 'ś', 'ź', 'ż'
    ],
    [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'
    ],
    [
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'
    ],
    [
        SPECIAL_BTNS.ENTER, 'z', 'x', 'c', 'v' , 'b', 'n', 'm', SPECIAL_BTNS.BACKSPACE
    ]
]

type Props = {
    activeRowIndex: number
    activeRowLetters: Array<string>
    noOfLettersAllowed: number
    guesses: Array<Array<string>>
    wordToGuessLetters: Array<string>
    handleActiveRowIndexChange: any
    handleActiveRowLettersChange: any
    handleGuessesChange: any
    currentGameStatus: GameStatus
}

const KEY_BTN_DEFAULT_CLASS = `flex
                               flex-1
                               p-0.5 m-0.5
                               justify-center
                               items-center
                               bg-gray-400
                               text-white
                               text-2xl
                               border-2
                               rounded-md
                               cursor-pointer
                               uppercase
                               select-none `

const Keyboard: FC<Props> = (props: Props) => {
    const currentWord = props.activeRowLetters.join('')
    const isExistingWord = currentWord.length !== props.noOfLettersAllowed ? null : useLiveQuery(
        async() => {
            const words = await db.words
                .where('value')
                .equals(currentWord)
                .toArray()

            return words.length > 0
        },
        [currentWord]
    )

    const keyboardLayout = keyboardBtns.map((row) => {
        return (
            <div className="flex flex-row">
                {
                    row.map((btnCaption) => {
                        const className = KEY_BTN_DEFAULT_CLASS + determineHighlightClass(btnCaption, props.guesses, props.wordToGuessLetters)

                        return (
                            <div
                                // key={btnCaption === SPECIAL_BTNS.ENTER ? 5000 : btnCaption === SPECIAL_BTNS.BACKSPACE ? 6000 : btnCaption.charCodeAt(0) - 96}
                                className={className}
                                onClick={
                                    props.currentGameStatus === GameStatus.IN_PROGRESS
                                    ? () => {
                                        switch(btnCaption) {
                                            case SPECIAL_BTNS.ENTER:
                                                if (props.activeRowLetters.length === props.noOfLettersAllowed) {
                                                    if (isExistingWord) {
                                                        submitGuess(props)
                                                    } else {
                                                        toast('😬 Not a valid word')
                                                    }
                                                }
                                                break
                                            case SPECIAL_BTNS.BACKSPACE:
                                                props.handleActiveRowLettersChange(popLetter(props.activeRowLetters))
                                                break
                                            default:
                                                props.handleActiveRowLettersChange(addLetterToRowIfPossible(props.activeRowLetters, props.noOfLettersAllowed, btnCaption))
                                        }
                                    }
                                    : null
                                }
                            >
                                {btnCaption}
                            </div>
                        )
                    })
                }
            </div>
        )
    })

    return (
        <div className="flex flex-col mt-3">
            {keyboardLayout}
        </div>
    )
}

export function determineHighlightClass(keyboardLetter: string, guesses: Array<Array<string>>, wordToGuessLetters: Array<string>) {
    // Return default class if button was not pushed yet
    if(! guesses.flat().includes(keyboardLetter)) {
        return typeClasses['default']
    }

    let type = Type.ABSENT

    guesses.forEach((guess: Array<string>) => {
        if (guess.indexOf(keyboardLetter) === wordToGuessLetters.indexOf(keyboardLetter) && guess.indexOf(keyboardLetter) !== -1) {
            type = Type.CORRECT
        }
        
        if (wordToGuessLetters.includes(keyboardLetter)) {
            type = type < Type.ELSEWHERE ? Type.ELSEWHERE : type
        }
    })

    return typeClasses[type]
}

function submitGuess(props: Props): void {
    props.handleGuessesChange(props.guesses.concat([props.activeRowLetters]))
    props.handleActiveRowIndexChange(props.activeRowIndex + 1)
    props.handleActiveRowLettersChange([])
}

function addLetterToRowIfPossible(letters: Array<string>, maxLength: number, newLetter: string): Array<string> {
    return letters.length < maxLength ? letters.concat([newLetter]) : letters
}

function popLetter(letters: Array<string>): Array<string> {
    return letters.length > 0 ? letters.slice(0, -1) : []
}

export default Keyboard