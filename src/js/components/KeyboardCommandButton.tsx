import React, { FC, MouseEventHandler } from "react"

type Props = {
    text: string,
    defaultClass: string,
    handleCommand: CallableFunction
}

const KeyboardCommandButton: FC<Props> = (props: Props) => {
    return (
            <div
                className={props.defaultClass}
                onClick={props.handleCommand as MouseEventHandler}
                data-testid="keyboard-button"
                id={'keyboard-button-' + props.text.toLowerCase()}
            >
                {props.text}
            </div>
    )
    
}

export default KeyboardCommandButton