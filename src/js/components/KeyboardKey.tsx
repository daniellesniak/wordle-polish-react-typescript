import React, { FC } from "react";
import { CellStatus } from "./RowCell";
import { twMerge } from "tailwind-merge";

type Props = {
    text: string,
    defaultClass: string,
    handleAppendLetter: CallableFunction,
    keyStatus: CellStatus
}

const KeyboardKey: FC<Props> = (props: Props) => {
    const typeClasses = keyboardKeyTypeClasses(props.defaultClass);

    return (
        <div
            className={twMerge(typeClasses[CellStatus.DEFAULT], typeClasses[props.keyStatus])}
            onClick={() => props.handleAppendLetter(props.text)}
            id={'keyboard-key-' + props.text.toLowerCase()}
            data-testid="keyboard-key"
        >
            {props.text}
        </div>
    );
    
};

export function keyboardKeyTypeClasses(defaultClass: string) {
    return {
        [CellStatus.CORRECT]: 'bg-green-500 border-green-400',
        [CellStatus.ELSEWHERE]: 'bg-yellow-500 border-yellow-400',
        [CellStatus.ABSENT]: 'bg-gray-600 border-gray-500',
        [CellStatus.DEFAULT]: defaultClass,
    };
}

export default KeyboardKey;
