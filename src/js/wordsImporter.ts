import { db, Word } from "./db"

export async function importWordsToDb(records: string[]): Promise<boolean> {
    try {
        const prepared = prepareRecords(records)
        await db.words.bulkAdd(prepared)

        return true
    } catch (err) {
        alert('An error occurred! See console log for details.')
        console.log(err)
    }

    return false
}

export function prepareRecords(values: string[]): Word[] {
    return values.map((word: string) => {
        return {
            value: word,
            length: word.length
        }
    })
}