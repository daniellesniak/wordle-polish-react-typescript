import { determineGameStatus, GameStatus, getRandomWordFromDB } from "../components/Game"
import { initDB, correctImportedRecords } from "./dbSetup"

beforeAll(async() => {
    return await initDB()
})

export const guesses: Array<Array<string>> = [
    ['f', 'i', 'd', 'ż', 'i'],
    ['p', 'a', 't', 'y', 'k']
]

const wordNotInGuesses: string = 'incor'

const ROWS_NUMBER: number = guesses.length

test('correct word in guesses gives win', () => {
    expect(determineGameStatus(guesses, 'patyk', ROWS_NUMBER)).toBe(GameStatus.WIN)
})

test('max guesses length reached without correct word in guesses gives lose', () => {
    expect(determineGameStatus(guesses, wordNotInGuesses, ROWS_NUMBER)).toBe(GameStatus.LOSE)
})

test('requirements for win or lose not met so gives in progress', () => {
    expect(determineGameStatus(guesses, wordNotInGuesses, 3)).toBe(GameStatus.IN_PROGRESS)
})

test('words are fetched from db properly', async() => {
    expect.assertions(2)

    const wordLength: number = 5

    const fetchedWord: string = await getRandomWordFromDB(wordLength)

    expect(fetchedWord).toBe(correctImportedRecords[0].value)
    expect(fetchedWord.length).toBe(wordLength)
})