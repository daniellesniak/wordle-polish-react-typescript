import React, { FC } from "react";

type Props = {
    message: string
}

const MessageBox: FC<Props> = (props: Props) => {
    return (
        <div className="flex justify-center items-center py-3 text-white text-xl">
            {props.message}
        </div>
    )
}

export default MessageBox