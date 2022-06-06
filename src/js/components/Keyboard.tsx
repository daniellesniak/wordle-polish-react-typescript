import React, { FC } from "react"
import KeyboardKey from "./KeyboardKey"
import KeyboardCommandButton from "./KeyboardCommandKey"
import { RowLetterStatus, type RowLetter } from "./Game"

export enum CMD_KEYS {
    ENTER = 'Enter',
    BACKSPACE = 'Backspace'
}

export const keyboardLayout: string[][] | CMD_KEYS[][] = [
    [
        'ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'
    ],
    [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'
    ],
    [
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'
    ],
    [
        CMD_KEYS.ENTER, 'z', 'x', 'c', 'v', 'b', 'n', 'm', CMD_KEYS.BACKSPACE
    ]
]

type Props = {
    handleAppendLetter: CallableFunction,
    commandKeysHandlers: Record<CMD_KEYS, CallableFunction>,
    submittedRows: RowLetter[][]
}

export const KEY_BTN_DEFAULT_CLASS = 'flex flex-1 p-0.5 m-0.5 justify-center items-center bg-gray-400 text-white text-xl border-2 border-gray-500 rounded-md cursor-pointer uppercase select-none'

const Keyboard: FC<Props> = (props: Props) => {
    const layout = keyboardLayout.map((row: string[] | CMD_KEYS[], i: number) => {
        return (
            <div className="flex flex-row" key={i}>
                {
                    row.map((btnText: string | CMD_KEYS, i) =>
                        btnText === CMD_KEYS.ENTER || btnText === CMD_KEYS.BACKSPACE
                        ? <KeyboardCommandButton
                            key={i}
                            text={btnText}
                            defaultClass={KEY_BTN_DEFAULT_CLASS}
                            handleCommand={props.commandKeysHandlers[btnText]}
                          />
                        : <KeyboardKey
                            key={i}
                            text={btnText}
                            defaultClass={KEY_BTN_DEFAULT_CLASS}
                            handleAppendLetter={props.handleAppendLetter}
                            keyStatus={getKeyboardButtonStatus(props.submittedRows, btnText)}
                          />
                    )
                }
            </div>
        )
    })

    return (
        <div className="flex flex-col mt-3" data-testid="keyboard">
            {layout}
        </div>
    )
}

export function getKeyboardButtonStatus(grid: RowLetter[][], letter: string): RowLetterStatus {
    let status: RowLetterStatus = RowLetterStatus.DEFAULT
    grid.forEach((row: RowLetter[]) => {
        row.forEach((rL: RowLetter) => {
            if (letter === rL.letter) {
                status = status > rL.status ? status : rL.status
            }
        })
    })

    return status
}

export default Keyboard