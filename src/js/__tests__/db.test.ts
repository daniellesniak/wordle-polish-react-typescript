import { db, Word } from "../db";

const testWords: string[] = "morze,zerom,omlet,arras,sixlet".split(',');

const dbRecords: Word[] = testWords.map((wordValue: string) => {
    return {
        value: wordValue,
        length: wordValue.length,
    };
});

db.words.bulkPut(dbRecords);

beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
});

afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
});

test('gets all words', async () => {
    expect((await db.all()).length).toBe(testWords.length);
});

test('gets random word of the given length', async () => {
    expect(await db.randomWord(5)).toStrictEqual({ id: 1, ...dbRecords[0] });
    
    expect(await db.randomWord(6)).toStrictEqual({ id: 5, ...dbRecords[4] });
});

test('checks if word exists in the database', async () => {
    expect(await db.exists('morze')).toBeTruthy();
    expect(await db.exists('omlet')).toBeTruthy();
    expect(await db.exists('sixlet')).toBeTruthy();
});

test('counts all words', async () => {
    expect(await db.count()).toBe(testWords.length);
});
