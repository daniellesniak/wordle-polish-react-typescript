import React from "react";
import RowCell from "./RowCell";
import { type Cell } from "./RowCell";

type Props = {
    rowCells: Array<Cell>,
    index: number
}

const Row: React.FC<Props> = (props: Props) => {
    return (
        <div className="flex justify-center" data-testid={'row-' + (props.index + 1)}>
            {props.rowCells.map((rowCell: Cell, i: number) => {
                return (
                    <RowCell key={i} rowCell={rowCell} index={i} rowIndex={props.index}></RowCell>
                );
            })}
        </div>
    );
};

export default Row;
