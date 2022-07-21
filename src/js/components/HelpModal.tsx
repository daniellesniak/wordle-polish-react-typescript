import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { type Cell as RowCell, CellStatus } from "./RowCell";
import Row from "./Row";

type Props = {
    isOpen: boolean,
    handleOpenHelpModal: CallableFunction
}

const EXAMPLE_ROW_CELLS: Record<string, RowCell[]> = {
    [CellStatus.CORRECT]: [
        { letter: "s", status: CellStatus.DEFAULT },
        { letter: "t", status: CellStatus.CORRECT },
        { letter: "y", status: CellStatus.DEFAULT },
        { letter: "p", status: CellStatus.DEFAULT },
        { letter: "a", status: CellStatus.DEFAULT },
    ],
    [CellStatus.ELSEWHERE]: [
        { letter: "b", status: CellStatus.DEFAULT },
        { letter: "e", status: CellStatus.DEFAULT },
        { letter: "r", status: CellStatus.ELSEWHERE },
        { letter: "y", status: CellStatus.DEFAULT },
        { letter: "l", status: CellStatus.DEFAULT },
    ],
    [CellStatus.ABSENT]: [
        { letter: "b", status: CellStatus.DEFAULT },
        { letter: "o", status: CellStatus.DEFAULT },
        { letter: "n", status: CellStatus.DEFAULT },
        { letter: "u", status: CellStatus.ABSENT },
        { letter: "s", status: CellStatus.DEFAULT },
    ],
};

const HelpModal: React.FC<Props> = (props: Props): React.ReactElement => {
    function closeModal() {
        props.handleOpenHelpModal(false);
    }

    return (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                                            <Row rowCells={EXAMPLE_ROW_CELLS[CellStatus.CORRECT]} index={0} />
                                            <p>The letter <strong>T</strong> is in the word and in the correct spot.</p>
                                        </div>

                                        <div className="py-2 mb-2">
                                            <Row rowCells={EXAMPLE_ROW_CELLS[CellStatus.ELSEWHERE]} index={0} />
                                            <p>The letter <strong>R</strong> is in the word but in the wrong spot.</p>
                                        </div>

                                        <div className="py-2 mb-2">
                                            <Row rowCells={EXAMPLE_ROW_CELLS[CellStatus.ABSENT]} index={0} />
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
