import React, { FC, useState, useEffect } from "react";

interface Props {
    message: string
    withSigns?: boolean

}

MessageBox.defaultProps = {
    withSigns: false
}

const MessageBox: FC<Props> = (props: Props) => {
    const dots = useSign('.')

    return (
        <div className="flex justify-center items-center py-3 text-white text-xl">
            {props.message + dots}
        </div>
    )
}

function useSign(sigleSignValue: string, maxLength = 3) {
    const [signs, setSigns] = useState(sigleSignValue)

    useEffect(() => {
        const signsTimer = setTimeout(() => {
            if (signs.length === maxLength) {
                setSigns(sigleSignValue)
            } else {
                setSigns(signs + sigleSignValue)
            }
        }, 1000)

        return () => clearTimeout(signsTimer)
    }, [signs, sigleSignValue, maxLength])

    return signs
}

export default MessageBox