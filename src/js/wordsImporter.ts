import { db, Word } from "./db"

export async function importWordsToDB(records: Array<Word>): Promise<boolean> {
    try {
        await db.words.bulkAdd(records)

        return true
    } catch (err) {
        alert('An error occurred! See console log for details.')
        console.log(err)
    }

    return false
}

export function prepareRecords(values: Array<string>): Array<Word> {
    return values.map((v: string) => {
        return {
            value: v,
            length: v.length
        }
    })
}