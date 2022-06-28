import React from "react";
import { twMerge }  from "tailwind-merge";
import { RefreshIcon } from "@heroicons/react/outline";

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
        <div className="flex flex-col p-4 text-center my-4" data-testid="replay">
            {props.heading?.text &&
            <div className={twMerge("text-white text-4xl", props.heading?.className ?? '')}>
                <strong data-testid="replay-heading">{props.heading.text}</strong>
            </div>}
            <div className="my-4">
                <button
                    type="button"
                    onClick={() => props.handleReplay()}
                    className={twMerge("py-1 px-8 bg-red-500 text-black rounded inline hover:bg-red-600 focus:bg-red-700", props.button?.className ?? '') }
                    data-testid="replay-button"
                >
                    <RefreshIcon className="w-6 h-6 inline" /> Replay
                </button>
            </div>
        </div>
    );
};

export default Replay;
