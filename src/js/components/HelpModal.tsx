import React, { Fragment } from "react";
import { type Cell as RowCell, CellStatus } from "./RowCell";
import Row from "./Row";
import Modal, { type ModalOpenCloseHandler } from "./common/Modal";

type Props = {
    isOpen: boolean,
    handleOpenClose: ModalOpenCloseHandler,
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

const HelpModal: React.FC<Props> = ({ isOpen, handleOpenClose }: Props): React.ReactElement => {
    return (
        <Modal isOpen={isOpen} handleOpenClose={handleOpenClose}>
            <>
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
            </>
        </Modal>
    );
};

export default HelpModal;
