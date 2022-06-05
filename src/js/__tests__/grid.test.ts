import { RowLetter, RowLetterStatus } from "../components/Game"
import Grid from "../grid"

const COLS_COUNT = 6
const ROWS_COUNT = 5

describe('Grid static class', () => {
    test('appends letter', () => {
        const grid: RowLetter[][] = Grid.appendLetter(initEmptyGrid(COLS_COUNT, ROWS_COUNT), 0, 0, 'm')

        expect(grid[0][0].letter).toBe('m')
    })

    test('checks if has empty letters', () => {
        let withoutOne: RowLetter[][] = initEmptyGrid(COLS_COUNT, ROWS_COUNT)
        withoutOne = Grid.appendLetter(withoutOne, 0, 0, 'm') 
        withoutOne = Grid.appendLetter(withoutOne, 0, 1, 'o') 
        withoutOne = Grid.appendLetter(withoutOne, 0, 2, 'r') 
        withoutOne = Grid.appendLetter(withoutOne, 0, 3, 'z')

        const withAll = Grid.appendLetter(withoutOne, 0, 4, 'e')

        expect(Grid.hasRowEmptyLetters(initEmptyGrid(COLS_COUNT, ROWS_COUNT), 0)).toBeTruthy() // empty grid
        expect(Grid.hasRowEmptyLetters(withoutOne, 0)).toBeTruthy()
        expect(Grid.hasRowEmptyLetters(withAll, 0)).toBeFalsy()
    })

    test('gets rowLetters at index', () => {
        let grid = initEmptyGrid(COLS_COUNT, ROWS_COUNT);


        Array.from("morze").forEach((letter: string, i: number) => {
            grid = Grid.appendLetter(grid, 0, i, letter)
        });

        expect(Grid.getRowLetters(grid, 0)).toMatchObject([
            {
                letter: "m",
                status: RowLetterStatus.DEFAULT
            },
            {
                letter: "o",
                status: RowLetterStatus.DEFAULT
            },
            {
                letter: "r",
                status: RowLetterStatus.DEFAULT
            },
            {
                letter: "z",
                status: RowLetterStatus.DEFAULT
            },
            {
                letter: "e",
                status: RowLetterStatus.DEFAULT
            }
        ])
    })

    test('sets an appropriate rowLetters statuses', () => {
        let grid: RowLetter[][] = initEmptyGrid(COLS_COUNT, ROWS_COUNT)
        
        Array.from("mozry").forEach((letter: string, i: number) => {
            grid = Grid.appendLetter(grid, 0, i, letter)
        });

        expect(Grid.setAppropriateRowLettersStatuses(grid, 0, "morze")[0]).toMatchObject([
            {
                letter: 'm',
                status: RowLetterStatus.CORRECT
            },
            {
                letter: 'o',
                status: RowLetterStatus.CORRECT
            },
            {
                letter: 'z',
                status: RowLetterStatus.ELSEWHERE
            },
            {
                letter: 'r',
                status: RowLetterStatus.ELSEWHERE
            },
            {
                letter: 'y',
                status: RowLetterStatus.ABSENT
            }
        ])
    })

    test('takes 2 first rows', () => {
        let grid: RowLetter[][] = initEmptyGrid(COLS_COUNT, ROWS_COUNT)
        
        Array.from("morze").forEach((letter: string, i: number) => {
            grid = Grid.appendLetter(grid, 0, i, letter)
        });

        Array.from("omlet").forEach((letter: string, i: number) => {
            grid = Grid.appendLetter(grid, 1, i, letter)
        });

        const takenRows = Grid.takeRows(grid, 2)

        expect(takenRows.length).toBe(2)
        
        expect(takenRows[0][0].letter).toBe('m')
        expect(takenRows[0][4].letter).toBe('e')

        expect(takenRows[1][0].letter).toBe('o')
        expect(takenRows[1][4].letter).toBe('t')
    })
})

function initEmptyGrid(colsCount: number, rowsCount: number){
    return Array(colsCount).fill(0).map(() => {
        return Array(rowsCount).fill(0).map(() => {
            return {
                letter: null,
                status: RowLetterStatus.DEFAULT
            }
        })
    })
}