import React from "react"
import { RowLetterStatus, type RowLetter as RowLetterType } from "./Game"

type Props = {
    rowLetter: RowLetterType,
    index: number,
    rowIndex: number
}

const RowLetter: React.FC<Props> = (props: Props) => {
    const typeClasses = rowLetterTypeClasses()

    let className = "flex justify-center items-center m-0.5 text-4xl text-white font-bold h-16 w-16 uppercase border-2 select-none "
    className += typeClasses[props.rowLetter.status]

    return (
        <div className={className} data-testid={'rowLetter-' + (props.rowIndex + 1) + (props.index + 1)}>
            { props.rowLetter.letter }
        </div>
    )
}

export default RowLetter

export function rowLetterTypeClasses() {
    return {
        [RowLetterStatus.CORRECT]: 'bg-green-500 border-green-400',
        [RowLetterStatus.ELSEWHERE]: 'bg-yellow-500 border-yellow-400',
        [RowLetterStatus.ABSENT]: 'bg-gray-600 border-gray-500',
        [RowLetterStatus.DEFAULT]: 'border-gray-400'
    }
}