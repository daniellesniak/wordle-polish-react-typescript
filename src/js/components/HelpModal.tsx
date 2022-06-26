import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RowCell } from "./Game";
import { RowCellStatus } from "./Game";
import Row from "./Row";

type Props = {
    isOpen: boolean
}

const EXAMPLE_ROW_CELLS: Record<string, RowCell[]> = {
    [RowCellStatus.CORRECT]: [
        { letter: "s", status: RowCellStatus.DEFAULT },
        { letter: "t", status: RowCellStatus.CORRECT },
        { letter: "y", status: RowCellStatus.DEFAULT },
        { letter: "p", status: RowCellStatus.DEFAULT },
        { letter: "a", status: RowCellStatus.DEFAULT },
    ],
    [RowCellStatus.ELSEWHERE]: [
        { letter: "b", status: RowCellStatus.DEFAULT },
        { letter: "e", status: RowCellStatus.DEFAULT },
        { letter: "r", status: RowCellStatus.ELSEWHERE },
        { letter: "y", status: RowCellStatus.DEFAULT },
        { letter: "l", status: RowCellStatus.DEFAULT },
    ],
    [RowCellStatus.ABSENT]: [
        { letter: "b", status: RowCellStatus.DEFAULT },
        { letter: "o", status: RowCellStatus.DEFAULT },
        { letter: "n", status: RowCellStatus.DEFAULT },
        { letter: "u", status: RowCellStatus.ABSENT },
        { letter: "s", status: RowCellStatus.DEFAULT },
    ],
};

const HelpModal: React.FC<Props> = (props: Props): React.ReactElement => {
    const [isOpen, setIsOpen] = useState(props.isOpen);

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-700 text-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mt-2">
                                        <div>
                                            Guess the <strong>WORDLE</strong> in six tries.
                                        </div>
                                    </div>
                                    
                                    <div className="mt-2">
                                        <div>
                                            Each guess must be a valid five-letter word. Hit the enter button to submit.
                                        </div>
                                    </div>
                                    
                                    <div className="mt-2">
                                        <p>
                                            After each guess, the color of the tiles will change to show how close your guess was to the word.
                                        </p>
                                    </div>

                                    <div className="mt-4 border-y border-white py-2">
                                        <div className="mb-2">
                                            <strong>Examples</strong>
                                        </div>

                                        <div className="py-2 mb-2">
                                            <Row rowCells={EXAMPLE_ROW_CELLS[RowCellStatus.CORRECT]} index={0} />
                                            <p>The letter <strong>T</strong> is in the word and in the correct spot.</p>
                                        </div>

                                        <div className="py-2 mb-2">
                                            <Row rowCells={EXAMPLE_ROW_CELLS[RowCellStatus.ELSEWHERE]} index={0} />
                                            <p>The letter <strong>R</strong> is in the word but in the wrong spot.</p>
                                        </div>

                                        <div className="py-2 mb-2">
                                            <Row rowCells={EXAMPLE_ROW_CELLS[RowCellStatus.ABSENT]} index={0} />
                                            <p>The letter <strong>U</strong> is in the word but in the wrong spot.</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default HelpModal;
