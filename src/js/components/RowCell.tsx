import React from "react";

type Props = {
    rowCell: Cell,
    index: number,
    rowIndex: number
}

export interface Cell {
    letter: string | null,
    status: CellStatus
}

export enum CellStatus {
    CORRECT = 3,
    ELSEWHERE = 2,
    ABSENT = 1,
    DEFAULT = 0
}

export const STATUS_CLASSES: Record<CellStatus, string> = {
    [CellStatus.CORRECT]: 'bg-green-500 border-green-400',
    [CellStatus.ELSEWHERE]: 'bg-yellow-500 border-yellow-400',
    [CellStatus.ABSENT]: 'bg-gray-600 border-gray-500',
    [CellStatus.DEFAULT]: 'border-gray-400',
};

const DEFAULT_CLASSES = "flex justify-center items-center m-0.5 text-4xl text-white font-bold h-16 w-16 uppercase border-2 select-none";

const RowCell: React.FC<Props> = ({ rowCell, index, rowIndex }: Props) => {
    const className = [DEFAULT_CLASSES, STATUS_CLASSES[rowCell.status]].join(' ');

    return (
        <div className={className} data-testid={'rowCell-' + (rowIndex + 1) + (index + 1)}>
            { rowCell.letter }
        </div>
    );
};

export default RowCell;
