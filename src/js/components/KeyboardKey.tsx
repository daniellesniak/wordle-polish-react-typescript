import React, { FC } from "react"
import { RowCellStatus } from "./Game"
import { twMerge } from "tailwind-merge"

type Props = {
    text: string,
    defaultClass: string,
    handleAppendLetter: CallableFunction,
    keyStatus: RowCellStatus
}

const KeyboardKey: FC<Props> = (props: Props) => {
    const typeClasses = keyboardKeyTypeClasses(props.defaultClass)

    return (
        <div
            className={twMerge(typeClasses[RowCellStatus.DEFAULT], typeClasses[props.keyStatus])}
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
        [RowCellStatus.CORRECT]: 'bg-green-500 border-green-400',
        [RowCellStatus.ELSEWHERE]: 'bg-yellow-500 border-yellow-400',
        [RowCellStatus.ABSENT]: 'bg-gray-600 border-gray-500',
        [RowCellStatus.DEFAULT]: defaultClass
    }
}

export default KeyboardKey