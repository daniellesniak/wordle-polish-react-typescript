import React, { FC } from "react"
import { RowLetterStatus } from "./Game"
import { twMerge } from "tailwind-merge"

type Props = {
    text: string,
    defaultClass: string,
    handleAppendLetter: CallableFunction,
    keyStatus: RowLetterStatus
}

const KeyboardKey: FC<Props> = (props: Props) => {
    const typeClasses = keyboardKeyTypeClasses(props.defaultClass)

    return (
        <div
            className={twMerge(typeClasses[RowLetterStatus.DEFAULT], typeClasses[props.keyStatus])}
            onClick={() => props.handleAppendLetter(props.text)}
            id={'keyboard-key-' + props.text.toLowerCase()}
            data-testid="keyboard-key"
        >
            {props.text}
        </div>
    )
    
}

export function keyboardKeyTypeClasses(defaultClass: string) {
    return {
        [RowLetterStatus.CORRECT]: 'bg-green-500 border-green-400',
        [RowLetterStatus.ELSEWHERE]: 'bg-yellow-500 border-yellow-400',
        [RowLetterStatus.ABSENT]: 'bg-gray-600 border-gray-500',
        [RowLetterStatus.DEFAULT]: defaultClass
    }
}

export default KeyboardKey