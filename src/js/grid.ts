import { RowCellStatus, type RowCell } from "./components/Game"

export default class Grid {
    static appendLetter(gridState: RowCell[][], atRow: number, atRowCell: number, letter: string): RowCell[][] {
        return this.shallow(gridState).map((row: RowCell[], rowIndex: number) => {
            return rowIndex === atRow
                ? row.map((rowCell: RowCell, rowCellIndex: number) => {
                    return rowCellIndex === atRowCell ? { ...rowCell, letter } : rowCell
                  })
                : row
        })
    }

    static removeLetter(gridState: RowCell[][], atRow: number, atRowCell: number): RowCell[][] {
        return this.shallow(gridState).map((row: RowCell[], rowIndex: number) => {
            return rowIndex === atRow
                ? row.map((rowCell: RowCell, rowCellIndex: number) => {
                    return rowCellIndex === atRowCell ? { ...rowCell, letter: null } : rowCell
                  })
                : row
        })
    }

    static hasRowEmptyLetters(gridState: RowCell[][], atRow: number): boolean {
        let hasSomeEmptyLetters = true

        gridState.forEach((row: RowCell[], rowIndex: number) => {
            if (rowIndex === atRow) {
                hasSomeEmptyLetters = row.some((rowCell: RowCell) => rowCell.letter === null)
            }
        })

        return hasSomeEmptyLetters
    }

    static getRowCells(gridState: RowCell[][], atRow: number): RowCell[] {
        return this.shallow(gridState)[atRow]
    }

    static takeRows(gridState: RowCell[][], numberOfItems: number): RowCell[][] {
        return gridState.filter((row: RowCell[], rowIndex: number) => {
            return rowIndex < numberOfItems
        })
    }

    static setAppropriateRowCellsStatuses(gridState: RowCell[][], atRow: number, correctWord: string): RowCell[][] {
        return this.shallow(gridState).map((row: RowCell[], rowIndex: number) => {
            if (rowIndex === atRow) {
                return row.map((rowCell: RowCell, rowCellIndex: number) => {
                    const status = this.isRowCellStatusCorrect(rowCell, correctWord[rowCellIndex])
                    ? RowCellStatus.CORRECT
                    : this.isRowCellStatusElswhere(rowCell, correctWord)
                        ? RowCellStatus.ELSEWHERE
                        : RowCellStatus.ABSENT
    
                    return { ...rowCell, status }
                })
            }

            return row
        })
    }

    static isRowCellStatusCorrect(rowCell: RowCell, letter: string): boolean {
        return rowCell.letter === letter
    }
    
    static isRowCellStatusElswhere(rowCell: RowCell, correctWord: string): boolean {
        return correctWord.includes(rowCell.letter)
    }

    static shallow(gridState: RowCell[][]) {
        return [...gridState]
    }
}