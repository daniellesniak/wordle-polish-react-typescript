import { RowLetterStatus, type RowLetter } from "./components/Game"

export default class Grid {
    static appendLetter(gridState: RowLetter[][], atCol: number, atRow: number, letter: string): RowLetter[][] {
        return this.shallow(gridState).map((rowLetters: RowLetter[], i: number) => {
            return i === atCol ? rowLetters.map((rowLetter: RowLetter, i: number) => {
                return i === atRow ? { ...rowLetter, letter } : rowLetter
            }) : rowLetters
        })
    }

    static removeLetter(gridState: RowLetter[][], atCol: number, atRow: number): RowLetter[][] {
        return this.shallow(gridState).map((rowLetters: RowLetter[], i: number) => {
            return i === atCol ? rowLetters.map((rowLetter: RowLetter, i: number) => {
                return i === atRow ? { ...rowLetter, letter: null } : rowLetter
            }) : rowLetters
        })
    }

    static hasRowEmptyLetters(gridState: RowLetter[][], atCol: number): boolean {
        let hasSomeEmptyLetters = true

        this.shallow(gridState).forEach((rowLetters: RowLetter[], i: number) => {
            if (i === atCol) {
                hasSomeEmptyLetters = rowLetters.some((rowLetter: RowLetter) => rowLetter.letter === null)
            }
        })

        return hasSomeEmptyLetters
    }

    static getRowLetters(gridState: RowLetter[][], atCol: number): RowLetter[] {
        return this.shallow(gridState)[atCol]
    }

    static takeRows(gridState: RowLetter[][], numberOfItems: number): RowLetter[][] {
        return gridState.filter((rowLetters: RowLetter[], i: number) => {
            return i < numberOfItems
        })
    }

    static setAppropriateRowLettersStatuses(gridState: RowLetter[][], atCol: number, correctWord: string): RowLetter[][] {
        return this.shallow(gridState).map((rowLetters: RowLetter[], i: number) => {
            if (i === atCol) {
                return rowLetters.map((rowLetter: RowLetter, i: number) => {
                    const status = this.isRowLetterStatusCorrect(rowLetter, correctWord[i])
                    ? RowLetterStatus.CORRECT
                    : this.isRowLetterStatusElswhere(rowLetter, correctWord)
                        ? RowLetterStatus.ELSEWHERE
                        : RowLetterStatus.ABSENT
    
                    return { ...rowLetter, status }
                })
            }

            return rowLetters
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