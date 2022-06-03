import React from "react"
import RefreshIcon from "./Icons/Refresh"
import { twMerge }  from "tailwind-merge"

interface Heading {
    text?: string,
    className?: string
}

interface Button {
    className?: string
}

interface Props {
    handleReplay: CallableFunction
    heading?: Heading
    button?: Button
}

const Replay: React.FC<Props> = (props: Props) => {
    return (
        <div className="flex flex-col p-4 text-center my-4">
            {props.heading?.text &&
            <div className={twMerge("text-white text-4xl", props.heading?.className ?? '')}>
                <strong>{props.heading.text}</strong>
            </div>}
            <div className="my-4">
                <button
                    type="button"
                    onClick={() => props.handleReplay()}
                    className={twMerge("py-1 px-8 bg-red-500 text-black rounded inline hover:bg-red-600 focus:bg-red-700", props.button?.className ?? '') }
                >
                    <RefreshIcon /> Replay
                </button>
            </div>
        </div>
    )
}

export default Replay