import { Cell as RowCell, CellStatus } from "../components/RowCell";
import Grid from "../grid";

const COLS_COUNT = 6;
const ROWS_COUNT = 5;

describe('Grid static class', () => {
    test('appends letter', () => {
        const grid: RowCell[][] = Grid.appendLetter(initEmptyGrid(COLS_COUNT, ROWS_COUNT), 0, 0, 'm');

        expect(grid[0][0].letter).toBe('m');
    });

    test('checks if has empty letters', () => {
        let withoutOne: RowCell[][] = initEmptyGrid(COLS_COUNT, ROWS_COUNT);
        withoutOne = Grid.appendLetter(withoutOne, 0, 0, 'm'); 
        withoutOne = Grid.appendLetter(withoutOne, 0, 1, 'o'); 
        withoutOne = Grid.appendLetter(withoutOne, 0, 2, 'r'); 
        withoutOne = Grid.appendLetter(withoutOne, 0, 3, 'z');

        const withAll = Grid.appendLetter(withoutOne, 0, 4, 'e');

        expect(Grid.hasRowEmptyLetters(initEmptyGrid(COLS_COUNT, ROWS_COUNT), 0)).toBeTruthy(); // empty grid
        expect(Grid.hasRowEmptyLetters(withoutOne, 0)).toBeTruthy();
        expect(Grid.hasRowEmptyLetters(withAll, 0)).toBeFalsy();
    });

    test('gets rowCells at index', () => {
        let grid = initEmptyGrid(COLS_COUNT, ROWS_COUNT);


        Array.from("morze").forEach((letter: string, i: number) => {
            grid = Grid.appendLetter(grid, 0, i, letter);
        });

        expect(Grid.getRowCells(grid, 0)).toMatchObject([
            {
                letter: "m",
                status: CellStatus.DEFAULT,
            },
            {
                letter: "o",
                status: CellStatus.DEFAULT,
            },
            {
                letter: "r",
                status: CellStatus.DEFAULT,
            },
            {
                letter: "z",
                status: CellStatus.DEFAULT,
            },
            {
                letter: "e",
                status: CellStatus.DEFAULT,
            },
        ]);
    });

    test('sets an appropriate rowCells statuses', () => {
        let grid: RowCell[][] = initEmptyGrid(COLS_COUNT, ROWS_COUNT);
        
        Array.from("mozry").forEach((letter: string, i: number) => {
            grid = Grid.appendLetter(grid, 0, i, letter);
        });

        expect(Grid.setAppropriateRowCellsStatuses(grid, 0, "morze")[0]).toMatchObject([
            {
                letter: 'm',
                status: CellStatus.CORRECT,
            },
            {
                letter: 'o',
                status: CellStatus.CORRECT,
            },
            {
                letter: 'z',
                status: CellStatus.ELSEWHERE,
            },
            {
                letter: 'r',
                status: CellStatus.ELSEWHERE,
            },
            {
                letter: 'y',
                status: CellStatus.ABSENT,
            },
        ]);
    });

    test('takes 2 first rows', () => {
        let grid: RowCell[][] = initEmptyGrid(COLS_COUNT, ROWS_COUNT);
        
        Array.from("morze").forEach((letter: string, i: number) => {
            grid = Grid.appendLetter(grid, 0, i, letter);
        });

        Array.from("omlet").forEach((letter: string, i: number) => {
            grid = Grid.appendLetter(grid, 1, i, letter);
        });

        const takenRows = Grid.takeRows(grid, 2);

        expect(takenRows.length).toBe(2);
        
        expect(takenRows[0][0].letter).toBe('m');
        expect(takenRows[0][4].letter).toBe('e');

        expect(takenRows[1][0].letter).toBe('o');
        expect(takenRows[1][4].letter).toBe('t');
    });
});

function initEmptyGrid(colsCount: number, rowsCount: number){
    return Array(colsCount).fill(0).map(() => {
        return Array(rowsCount).fill(0).map(() => {
            return {
                letter: null,
                status: CellStatus.DEFAULT,
            };
        });
    });
}
