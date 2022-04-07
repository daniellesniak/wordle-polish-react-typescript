import React, { FC, useState, useEffect } from "react";

interface Props {
    message: string
    withEllipsis?: boolean
    ellipsisSign?: string
}

const MessageBox: FC<Props> = (props: Props) => {
    const dots = useEllipsis(props.ellipsisSign)

    return (
        <div className="flex justify-center items-center py-3 text-white text-xl">
            {props.message + (props.withEllipsis ? dots : '')}
        </div>
    )
}

function useEllipsis(ellipsisSign: string, maxLength = 3) {
    const [ellipsis, setEllipsis] = useState(ellipsisSign)

    useEffect(() => {
        const ellipsisTimer = setTimeout(() => {
            if (ellipsis.length === maxLength) {
                setEllipsis(ellipsisSign)
            } else {
                setEllipsis(ellipsis + ellipsisSign)
            }
        }, 1000)

        return () => clearTimeout(ellipsisTimer)
    }, [ellipsis, ellipsisSign, maxLength])

    return ellipsis
}

MessageBox.defaultProps = {
    withEllipsis: true,
    ellipsisSign: '.'
}

export default MessageBox