import { RowLetterStatus, type RowLetter } from "./components/Game"

export default class Grid {
    static appendLetter(gridState: RowLetter[][], atRow: number, atRowLetter: number, letter: string): RowLetter[][] {
        return this.shallow(gridState).map((row: RowLetter[], rowIndex: number) => {
            return rowIndex === atRow
                ? row.map((rowLetter: RowLetter, rowLetterIndex: number) => {
                    return rowLetterIndex === atRowLetter ? { ...rowLetter, letter } : rowLetter
                  })
                : row
        })
    }

    static removeLetter(gridState: RowLetter[][], atRow: number, atRowLetter: number): RowLetter[][] {
        return this.shallow(gridState).map((row: RowLetter[], rowIndex: number) => {
            return rowIndex === atRow
                ? row.map((rowLetter: RowLetter, rowLetterIndex: number) => {
                    return rowLetterIndex === atRowLetter ? { ...rowLetter, letter: null } : rowLetter
                  })
                : row
        })
    }

    static hasRowEmptyLetters(gridState: RowLetter[][], atRow: number): boolean {
        let hasSomeEmptyLetters = true

        gridState.forEach((row: RowLetter[], rowIndex: number) => {
            if (rowIndex === atRow) {
                hasSomeEmptyLetters = row.some((rowLetter: RowLetter) => rowLetter.letter === null)
            }
        })

        return hasSomeEmptyLetters
    }

    static getRowLetters(gridState: RowLetter[][], atRow: number): RowLetter[] {
        return this.shallow(gridState)[atRow]
    }

    static takeRows(gridState: RowLetter[][], numberOfItems: number): RowLetter[][] {
        return gridState.filter((row: RowLetter[], rowIndex: number) => {
            return rowIndex < numberOfItems
        })
    }

    static setAppropriateRowLettersStatuses(gridState: RowLetter[][], atRow: number, correctWord: string): RowLetter[][] {
        return this.shallow(gridState).map((row: RowLetter[], rowIndex: number) => {
            if (rowIndex === atRow) {
                return row.map((rowLetter: RowLetter, rowLetterIndex: number) => {
                    const status = this.isRowLetterStatusCorrect(rowLetter, correctWord[rowLetterIndex])
                    ? RowLetterStatus.CORRECT
                    : this.isRowLetterStatusElswhere(rowLetter, correctWord)
                        ? RowLetterStatus.ELSEWHERE
                        : RowLetterStatus.ABSENT
    
                    return { ...rowLetter, status }
                })
            }

            return row
        })
    }

    static isRowLetterStatusCorrect(rowLetter: RowLetter, letter: string): boolean {
        return rowLetter.letter === letter
    }
    
    static isRowLetterStatusElswhere(rowLetter: RowLetter, correctWord: string): boolean {
        return correctWord.includes(rowLetter.letter)
    }

    static shallow(gridState: RowLetter[][]) {
        return [...gridState]
    }
}