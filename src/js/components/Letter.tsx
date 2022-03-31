import React from "react"

type Props = {
    index: number,
    wordToGuessLetters: Array<string>,
    assignedLetter: string,
    letters: Array<string>
    isLocked: boolean
}

export enum Type {
    CORRECT = 3,
    ELSEWHERE = 2,
    ABSENT = 1
}

export const typeClasses = {
    [Type.CORRECT]: 'bg-green-500 border-green-400',
    [Type.ELSEWHERE]: 'bg-yellow-500 border-yellow-400',
    [Type.ABSENT]: 'bg-gray-600 border-gray-500',
    'default': 'border-gray-400'
}

const Letter: React.FC<Props> = (props: Props) => {
    let className = "flex justify-center items-center m-0.5 text-4xl text-white font-bold h-16 w-16 uppercase border-2 select-none "
    className += ! props.isLocked ? 'border-gray-600 ' : ''

    if (props.isLocked) {
        var type = Type.ABSENT

        if (doesLettersMatchIncludingPositions(props.index, props.letters, props.wordToGuessLetters)) {
            type = Type.CORRECT
        } else if (doesWordIncludesLetter(props.wordToGuessLetters, props.assignedLetter)) {
            type = Type.ELSEWHERE
        }
    }

    className += type !== undefined ? typeClasses[type] : ''

    return (
        <div className={className}>
            { props.assignedLetter }
        </div>
    )
}



export default Letter

function doesLettersMatchIncludingPositions(position: number, lettersArr: Array<string>, wordLetters: Array<string>) {
    return lettersArr[position] === wordLetters[position]
}

function doesWordIncludesLetter(wordLetters: Array<string>, letter: string) {
    return wordLetters.includes(letter)
}