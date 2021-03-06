import { Transition } from "@headlessui/react";
import React, { useState, Fragment, ReactElement } from "react";
import { type NavItem } from "./TheHeader";
import { XIcon } from "@heroicons/react/outline";

type Props = {
    navItems: NavItem[]
}

const MobileNav: React.FC<Props> = ({ navItems }: Props): ReactElement => {
    const [isNavOpened, setIsNavOpened] = useState(false);

    function openNav(): void {
        setIsNavOpened(true);
    }

    function closeNav(): void {
        setIsNavOpened(false);
    }

    const navItemElements: ReactElement[] = navItems.map((navItem: NavItem, key: number) => {
        return renderNavItem(key, navItem);
    });

    const navElement: ReactElement = renderNav(navItemElements, closeNav);

    const hamburgerButton: ReactElement = renderHamburger(openNav);

    return (
        <>
            {renderWithEaseInOutTransition(isNavOpened, navElement)}
            {renderWithEaseInOutTransition(!isNavOpened, hamburgerButton)}
        </>
    );
};

export default MobileNav;

function renderHamburger(onClick: CallableFunction): ReactElement {
    return (
        <button className="absolute p-6 space-y-2 rounded shadow md:hidden z-10" onClick={() => onClick()}>
            <span className="block w-8 h-0.5 bg-gray-100"></span>
            <span className="block w-8 h-0.5 bg-gray-100"></span>
            <span className="block w-8 h-0.5 bg-gray-100"></span>
        </button>
    );
}

function renderNavItem(key: number, navItem: NavItem): ReactElement {
    return (
        <span
            key={key}
            className="hover:bg-gray-600 w-screen py-10 text-center"
            onClick={navItem.onClick}
        >
            {navItem.text}
        </span>
    );
}

function renderNav(navItems: ReactElement[], handleCloseNav: CallableFunction) {
    return (
        <nav className="fixed w-screen h-screen bg-black z-50 md:hidden" data-testid="testtest">
            <button className="absolute p-4" onClick={() => handleCloseNav()}>
                <XIcon className="w-8 h-8" />
            </button>
            <div className="grid py-20 justify-items-center items-center h-screen text-4xl">
                {navItems}
            </div>
        </nav>
    );
}

function renderWithEaseInOutTransition(isShowing: boolean, element: ReactElement): ReactElement {
    return (
        <Transition
            as={Fragment}
            show={isShowing}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
        >
            {element}
        </Transition>
    );
}
