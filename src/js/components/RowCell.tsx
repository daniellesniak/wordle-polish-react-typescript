import React from "react"
import { RowCellStatus, type RowCell as RowCellType } from "./Game"

type Props = {
    rowCell: RowCellType,
    index: number,
    rowIndex: number
}

const RowCell: React.FC<Props> = (props: Props) => {
    const typeClasses = rowCellTypeClasses()

    let className = "flex justify-center items-center m-0.5 text-4xl text-white font-bold h-16 w-16 uppercase border-2 select-none "
    className += typeClasses[props.rowCell.status]

    return (
        <div className={className} data-testid={'rowCell-' + (props.rowIndex + 1) + (props.index + 1)}>
            { props.rowCell.letter }
        </div>
    )
}

export default RowCell

export function rowCellTypeClasses() {
    return {
        [RowCellStatus.CORRECT]: 'bg-green-500 border-green-400',
        [RowCellStatus.ELSEWHERE]: 'bg-yellow-500 border-yellow-400',
        [RowCellStatus.ABSENT]: 'bg-gray-600 border-gray-500',
        [RowCellStatus.DEFAULT]: 'border-gray-400'
    }
}