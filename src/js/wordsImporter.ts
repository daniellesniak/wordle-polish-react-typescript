import { db, Word } from "./db"

export async function importWordsToDB(records: Array<Word>) {
    try {
        await db.words.bulkAdd(records)
    } catch (err) {
        alert('An error occurred! See console log for details.')
        console.log(err)
    }
}

export function prepareRecords(values: Array<string>): Array<Word> {
    return values.map((v: string) => {
        return {
            value: v,
            length: v.length
        }
    })
}