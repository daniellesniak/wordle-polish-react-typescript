import React from "react"
import Letter from "./Letter"
import { type RowLetter } from "./Game"

type Props = {
    rowLetters: Array<RowLetter>
}

const Row: React.FC<Props> = (props: Props) => {
    return (
        <div className="flex justify-center">
            {props.rowLetters.map((rowLetter: RowLetter, i: number) => {
                return (
                    <Letter key={i} rowLetter={rowLetter}></Letter>
                )
            })}
        </div>
    )
}

export default Row