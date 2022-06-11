import React, { FC, MouseEventHandler } from "react";

type Props = {
    text: string,
    defaultClass: string,
    handleCommand: CallableFunction
}

const KeyboardCommandKey: FC<Props> = (props: Props) => {
    return (
            <div
                className={props.defaultClass}
                onClick={props.handleCommand as MouseEventHandler}
                data-testid="keyboard-key"
                id={'keyboard-key-' + props.text.toLowerCase()}
            >
                {props.text}
            </div>
    );
    
};

export default KeyboardCommandKey;
