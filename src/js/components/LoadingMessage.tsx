import React, { FC, useState, useEffect } from "react";

type Ellipsis = {
    sign: string,
    intervalInMs: number,
    maxLength: number
}

interface Props {
    message: string
    withEllipsis?: boolean,
    ellipsis?: Ellipsis
}

const LoadingMessage: FC<Props> = ({message, withEllipsis, ellipsis}: Props) => {
    const dots = useEllipsis(ellipsis);

    return (
        <div className="flex justify-center items-center py-3 text-white text-xl">
            {message + (withEllipsis ? dots : '')}
        </div>
    );
};

function useEllipsis(ellipsis: Ellipsis) {
    const [ellipsisContent, setEllipsis] = useState(ellipsis.sign);

    useEffect(() => {
        function determineEllipsis() {
            return ellipsisContent.length === ellipsis.maxLength
                ? ellipsis.sign 
                : ellipsisContent + ellipsis.sign;
        }

        const ellipsisTimer = setTimeout(() => {
            setEllipsis(determineEllipsis());
        }, 1000);

        return () => clearTimeout(ellipsisTimer);
    }, [ellipsisContent, ellipsis]);

    return ellipsisContent;
}

LoadingMessage.defaultProps = {
    withEllipsis: false,
    ellipsis: {
        sign: '.',
        intervalInMs: 1000,
        maxLength: 3,
    },
};

export default LoadingMessage;
