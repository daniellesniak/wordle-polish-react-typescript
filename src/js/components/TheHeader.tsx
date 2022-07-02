import { Transition } from "@headlessui/react";
import React, { MouseEventHandler, ReactElement, useState } from "react";
import MobileNav from "./MobileNav";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { ChartBarIcon } from "@heroicons/react/outline";

type Props = {
    handleOpenHelpModal: (shouldOpen: boolean) => void,
    handleOpenStatsModal: (shouldOpen: boolean) => void
}

export type NavItem = {
    text: string,
    title: string,
    onClick: MouseEventHandler,
    iconElement: ReactElement
}

const NAV_ICON_DEFAULT_CLASS = "w-6 h-6";

const TheHeader: React.FC<Props> = ({ handleOpenHelpModal, handleOpenStatsModal }: Props) => {
    const [isHeaderShowing] = useState(true);

    const navItems: NavItem[] = [
        {
            text: 'Stats',
            title: 'Show my stats',
            onClick: () => handleOpenStatsModal(true),
            iconElement: <ChartBarIcon className={NAV_ICON_DEFAULT_CLASS} />,
        },
        {
            text: 'Help',
            title: 'Show help modal',
            onClick: () => handleOpenHelpModal(true),
            iconElement: <QuestionMarkCircleIcon className={NAV_ICON_DEFAULT_CLASS} />,
        },
    ];

    const navItemsForMdDevices = navItems.map((navItem: NavItem, key: number) => {
        return renderNavItemForMdDevices(navItem, key);
    });

    return (
        <>
            <MobileNav navItems={navItems}/>
            <Transition
                appear={true}
                show={isHeaderShowing}
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
                                {navItemsForMdDevices}
                            </div>
                        </div>
                    </nav>
                </header>
            </Transition>
        </>
    );
};

export default TheHeader;

function renderNavItemForMdDevices(navItem: NavItem, key: number): ReactElement {
    return (
        <button
            key={key}
            type="button"
            title={navItem.title}
            onClick={navItem.onClick}
            className="py-1 px-2 bg-transparent rounded inline text-gray-100 hover:bg-gray-100 hover:text-gray-700"
        >
            {navItem.iconElement}
        </button>
    );
}
