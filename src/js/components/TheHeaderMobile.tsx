import { Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import CloseIcon from "./Icons/Close";
import { NavItem } from "./TheHeader";

type Props = {
    navItems: NavItem[]
}

const TheHeaderMobile: React.FC<Props> = (props: Props) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    function openMenu() {
        setIsMenuOpened(true);
    }

    function closeMenu() {
        setIsMenuOpened(false);
    }

    const navItems = props.navItems.map((navItem: NavItem, key: number) => {
        return (
            <span key={key} className="hover:bg-gray-600 w-screen py-10 text-center" onClick={navItem.onClick}>{navItem.text}</span>
        );
    });

    const nav = (
        <div className="fixed w-screen h-screen bg-black z-50 md:hidden">
            <button className="absolute m-4" onClick={() => closeMenu()}>
                <CloseIcon />
            </button>
            <div className="grid py-20 justify-items-center items-center h-screen text-4xl">
                {navItems}
            </div>
        </div>
    );

    const openButton = (
        <button className="absolute p-6 space-y-2 rounded shadow md:hidden z-10" onClick={() => openMenu()}>
            <span className="block w-8 h-0.5 bg-gray-100"></span>
            <span className="block w-8 h-0.5 bg-gray-100"></span>
            <span className="block w-8 h-0.5 bg-gray-100"></span>
        </button>
    );

    return (
        <>
            <Transition
                appear={isMenuOpened}
                as={Fragment}
                show={isMenuOpened}
                enter="transition ease-in-out duration-500 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-500 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                {nav}
            </Transition>
            
            <Transition
                appear={!isMenuOpened}
                as={Fragment}
                show={!isMenuOpened}
                enter="transition ease-in-out duration-500 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-500 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                {openButton}
            </Transition>
        </>
    );
};

export default TheHeaderMobile;
