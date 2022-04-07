require("fake-indexeddb/auto");

import { importWordsToDB, prepareRecords } from "../src/js/wordsImporter"

import { db, Word } from "../src/js/db"

export const words: Array<string> = ['fidżi', 'jestem', 'może']
export const correctlyPreparedRecords: Array<Word> = [
    {
        value: words[0],
        length: words[0].length
    },
    {
        value: words[1],
        length: words[1].length
    },
    {
        value: words[2],
        length: words[2].length
    }
]

export const correctImportedRecords: Array<Word> = [
    {
        id: 1,
        value: words[0],
        length: words[0].length
    },
    {
        id: 2,
        value: words[1],
        length: words[1].length
    },
    {
        id: 3,
        value: words[2],
        length: words[2].length
    }
]

export async function initDB() {
    if (await db.words.count() === 0) {
        await importWordsToDB(prepareRecords(words))
    }
}