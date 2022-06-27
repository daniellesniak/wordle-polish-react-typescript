import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import QuestionMarkIcon from "./Icons/QuestionMark";

type Props = {
    handleOpenHelpModal: CallableFunction
}

const TheHeader: React.FC<Props> = (props: Props) => {
    const [isShowing] = useState(true);

    return (
        <Transition
            appear={true}
            show={isShowing}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
        >
            <div className="flex flex-row items-center py-3 mb-4">
                <div className="basis-4/12"></div>
                <div className="basis-4/12 text-center">
                    <h1 className="text-4xl font-bold text-gray-100 select-none">Wordle PL</h1>
                </div>
                <div className="basis-4/12 text-right pr-4">
                    <button
                        type="button"
                        title="Show me help modal"
                        onClick={() => props.handleOpenHelpModal(true)}
                        className="py-1 px-2 bg-transparent text-white rounded inline hover:bg-white hover:text-black"
                    >
                    <QuestionMarkIcon />
                    </button>
                </div>
            </div>
        </Transition>
    );
};

export default TheHeader;
