import React from "react";
import Letter from "./RowCell";
import { type RowCell } from "./Game";

type Props = {
    rowCells: Array<RowCell>,
    index: number
}

const Row: React.FC<Props> = (props: Props) => {
    return (
        <div className="flex justify-center" data-testid={'row-' + (props.index + 1)}>
            {props.rowCells.map((rowCell: RowCell, i: number) => {
                return (
                    <Letter key={i} rowCell={rowCell} index={i} rowIndex={props.index}></Letter>
                );
            })}
        </div>
    );
};

export default Row;
