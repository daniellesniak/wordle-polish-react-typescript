import { initDB, words, correctlyPreparedRecords, correctImportedRecords } from "./dbSetup"
import { db, Word } from "../db"
import { prepareRecords } from "../wordsImporter"

window.alert = jest.fn()

test('strings are preparing correctly as records', () => {
    expect(prepareRecords(words)).toEqual(correctlyPreparedRecords)
})

test('records are importing correctly', async () => {
    expect.assertions(1)

    await initDB()
    const dbRecords: Array<Word> = (await db.words.toArray())

    expect(dbRecords).toEqual(correctImportedRecords)
})