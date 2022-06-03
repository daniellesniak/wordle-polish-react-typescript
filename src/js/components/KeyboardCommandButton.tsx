import React, { FC, MouseEventHandler } from "react"

type Props = {
    text: string,
    defaultClass: string,
    handleCommand: CallableFunction
}

const KeyboardCommandButton: FC<Props> = (props: Props) => {
    return (
            <div className={props.defaultClass} onClick={props.handleCommand as MouseEventHandler}>
                {props.text}
            </div>
    )
    
}

export default KeyboardCommandButton