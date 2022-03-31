import React, { useState } from "react"
import Letter from "./Letter"

type Props = {
    isActiveRow: boolean,
    isLocked: boolean,
    noOfLetters: number,
    letters: Array<string>
    wordToGuessLetters: Array<string>
}

const Row: React.FC<Props> = (props: Props) => {
    const [letters, setLetters] = useState(props.letters)

    return (
        <div className="flex justify-center">
            {
                Array(props.noOfLetters).fill(0).map((v: number, i: number) => {
                    return <Letter
                                key={i}
                                index={i}
                                wordToGuessLetters={props.wordToGuessLetters}
                                letters={props.letters}
                                assignedLetter={props.letters ? props.letters[i] : null}
                                isLocked={props.isLocked}
                            ></Letter>
                })
            }
        </div>
    )
}

export default Row