import { Transition } from "@headlessui/react";
import React, { MouseEventHandler, ReactElement, useState } from "react";
import QuestionMarkIcon from "./Icons/QuestionMark";
import TheHeaderMobile from "./TheHeaderMobile";

type Props = {
    handleOpenHelpModal: CallableFunction
}

export type NavItem = {
    text: string,
    title: string,
    onClick: MouseEventHandler,
    iconElement: ReactElement
}

const TheHeader: React.FC<Props> = (props: Props) => {
    const [isShowing] = useState(true);

    const navItems: NavItem[] = [
        {
            text: 'Help',
            title: 'Show help modal',
            onClick: () => props.handleOpenHelpModal(true),
            iconElement: <QuestionMarkIcon />,
        },
    ];

    const mdDevicesNavItems = navItems.map((navItem: NavItem, key: number) => {
        return (
            <button
                key={key}
                type="button"
                title={navItem.title}
                onClick={navItem.onClick}
                className="py-1 px-2 bg-transparent text-white rounded inline hover:bg-white hover:text-black"
            >
                {navItem.iconElement}
            </button>
        );
    });

    return (
        <>
            <TheHeaderMobile navItems={navItems}/>
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
                <header>
                    <nav className="flex items-center py-3 mb-4">
                        <div className="flex-1">

                        </div>
                        <div className="grow text-center">
                            <h1 className="text-4xl font-bold text-gray-100 select-none">Wordle PL</h1>
                        </div>
                        <div className="flex-1 text-right">
                            <div className="hidden md:block px-4 space-x-1">
                                {mdDevicesNavItems}
                            </div>
                        </div>
                    </nav>
                </header>
            </Transition>
        </>
    );
};

export default TheHeader;
