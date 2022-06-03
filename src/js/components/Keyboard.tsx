import React, { FC } from "react"
import KeyboardButton from "./KeyboardButton"
import KeyboardCommandButton from "./KeyboardCommandButton"
import { RowLetterStatus, type RowLetter } from "./Game"

export enum CMD_BTNS {
    ENTER = 'Enter',
    BACKSPACE = 'Backspace'
}

export const keyboardLayout: string[][] | CMD_BTNS[][] = [
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
        CMD_BTNS.ENTER, 'z', 'x', 'c', 'v', 'b', 'n', 'm', CMD_BTNS.BACKSPACE
    ]
]

type Props = {
    handleAppendLetter: CallableFunction,
    commandButtonsHandlers: Record<CMD_BTNS, CallableFunction>,
    submittedRows: RowLetter[][]
}

const KEY_BTN_DEFAULT_CLASS = `flex
                               flex-1
                               p-0.5 m-0.5
                               justify-center
                               items-center
                               bg-gray-400
                               text-white
                               text-xl
                               border-2
                               border-gray-500
                               rounded-md
                               cursor-pointer
                               uppercase
                               select-none `

const Keyboard: FC<Props> = (props: Props) => {
    const layout = keyboardLayout.map((row: string[] | CMD_BTNS[], i: number) => {
        return (
            <div className="flex flex-row" key={i}>
                {
                    row.map((btnText: string | CMD_BTNS, i) =>
                        btnText === CMD_BTNS.ENTER || btnText === CMD_BTNS.BACKSPACE
                        ? <KeyboardCommandButton
                            key={i}
                            text={btnText}
                            defaultClass={KEY_BTN_DEFAULT_CLASS}
                            handleCommand={props.commandButtonsHandlers[btnText]}
                          />
                        : <KeyboardButton
                            key={i}
                            text={btnText}
                            defaultClass={KEY_BTN_DEFAULT_CLASS}
                            handleAppendLetter={props.handleAppendLetter}
                            buttonStatus={getKeyboardButtonStatus(props.submittedRows, btnText)}
                          />
                    )
                }
            </div>
        )
    })

    return (
        <div className="flex flex-col mt-3">
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