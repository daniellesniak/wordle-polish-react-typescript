import { db, Word } from "./db"

export async function importDictionaryToDb(records: string[]): Promise<boolean> {
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

export function prepareRecords(values: string[]): Array<Word> {
    return values.map((v: string) => {
        return {
            value: v,
            length: v.length
        }
    })
}