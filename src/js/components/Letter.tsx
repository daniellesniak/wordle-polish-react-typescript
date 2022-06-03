import React from "react"
import { RowLetterStatus, type RowLetter } from "./Game"

type Props = {
    key: number,
    rowLetter: RowLetter
}

const Letter: React.FC<Props> = (props: Props) => {
    const typeClasses = {
        [RowLetterStatus.CORRECT]: 'bg-green-500 border-green-400',
        [RowLetterStatus.ELSEWHERE]: 'bg-yellow-500 border-yellow-400',
        [RowLetterStatus.ABSENT]: 'bg-gray-600 border-gray-500',
        [RowLetterStatus.DEFAULT]: 'border-gray-400'
    }

    let className = "flex justify-center items-center m-0.5 text-4xl text-white font-bold h-16 w-16 uppercase border-2 select-none "
    className += typeClasses[props.rowLetter.status]

    return (
        <div className={className}>
            { props.rowLetter.letter }
        </div>
    )
}



export default Letter

// function doesLettersMatchIncludingPositions(position: number, lettersArr: Array<string>, wordLetters: Array<string>) {
//     return lettersArr[position] === wordLetters[position]
// }

// function doesWordIncludesLetter(wordLetters: Array<string>, letter: string) {
//     return wordLetters.includes(letter)
// }