import { Transition } from "@headlessui/react";
import React, { useState } from "react";

const TheHeader: React.FC = () => {
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
            <div className="flex justify-center items-center py-3 mb-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-100 select-none">Wordle PL</h1>
                </div>
            </div>
        </Transition>
    );
};

export default TheHeader;
