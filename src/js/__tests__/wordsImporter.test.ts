import { db, Word } from "../db";
import { prepareRecords, importWordsToDb } from "../wordsImporter";

const toImport: string[] = "word1,word2,word3,word4".split(',');

test('prepares records', () => {
    const prepared: Word[] = prepareRecords(toImport);

    for (const word of toImport) {
        expect(prepared).toContainEqual({
            value: word,
            length: word.length,
        });
    }
});

test('imports words to DB', async () => {
    const isImported = await importWordsToDb(toImport);

    const allDbRecords = await db.all();

    expect(isImported).toBeTruthy();
    expect(allDbRecords.length).toBe(toImport.length);

    expect(allDbRecords).toContainEqual({
        id: 1,
        value: toImport[0],
        length: toImport[0].length,
    });

    expect(allDbRecords).toContainEqual({
        id: 4,
        value: toImport[3],
        length: toImport[3].length,
    });
});
