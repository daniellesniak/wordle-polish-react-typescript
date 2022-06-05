import React from "react"
import Letter from "./Letter"
import { type RowLetter } from "./Game"

type Props = {
    rowLetters: Array<RowLetter>,
    index: number
}

const Row: React.FC<Props> = (props: Props) => {
    return (
        <div className="flex justify-center" data-testid={'row-' + (props.index + 1)}>
            {props.rowLetters.map((rowLetter: RowLetter, i: number) => {
                return (
                    <Letter key={i} rowLetter={rowLetter} index={i} rowIndex={props.index}></Letter>
                )
            })}
        </div>
    )
}

export default Row