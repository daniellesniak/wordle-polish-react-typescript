import { db, Stat, StatType, Word } from "../db";

const testWords: string[] = "morze,zerom,omlet,arras,sixlet".split(',');

const wordsDbRecords: Word[] = testWords.map((wordValue: string) => {
    return {
        value: wordValue,
        length: wordValue.length,
    };
});

const testStats: StatType[] = [StatType.WIN, StatType.WIN, StatType.WIN, StatType.LOSE, StatType.LOSE];

const statsDbRecords: Stat[] = testStats.map((statType: StatType) => {
    return {
        type: statType,
        created_at: Date.now(),
    };
});

beforeEach(async () => {
    await db.open();
    await db.words.bulkAdd(wordsDbRecords);
    await db.stats.bulkAdd(statsDbRecords);

    jest.spyOn(global.Math, 'random').mockReturnValue(0);
});

afterEach(async () => {
    await db.delete();

    jest.spyOn(global.Math, 'random').mockRestore();
});

test('gets all words', async () => {
    expect((await db.all()).length).toBe(testWords.length);
});

test('gets random word of the given length', async () => {
    expect(await db.randomWord(5)).toStrictEqual({ id: 1, ...wordsDbRecords[0] });
    
    expect(await db.randomWord(6)).toStrictEqual({ id: 5, ...wordsDbRecords[4] });
});

test('checks if word exists in the database', async () => {
    expect(await db.wordExists('morze')).toBeTruthy();
    expect(await db.wordExists('omlet')).toBeTruthy();
    expect(await db.wordExists('sixlet')).toBeTruthy();
});

test('counts all words', async () => {
    expect(await db.count()).toBe(testWords.length);
});

test('adds win stat', async () => {
    await db.addStat(StatType.WIN);

    expect(await db.count('stats')).toBe(statsDbRecords.length + 1);
    expect((await db.stats.orderBy('id').last()).type).toBe(StatType.WIN);
});

test('adds lose stat', async () => {
    await db.addStat(StatType.LOSE);

    expect(await db.count('stats')).toBe(statsDbRecords.length + 1);
    expect((await db.stats.orderBy('id').last()).type).toBe(StatType.LOSE);
});

test('gets all stats', async () => {
    const stats = await db.getStats(); // 1st parameter is null by default so it means get all stats

    expect(Array.isArray).toBeTruthy();
    expect(stats).toHaveLength(statsDbRecords.length);
});

test('gets win stats', async () => {
    const winTestRecords: Stat[] = statsDbRecords.filter((stat: Stat) => stat.type === StatType.WIN);
    const statsFromDb = await db.getStats(StatType.WIN);

    expect(Array.isArray(statsFromDb)).toBeTruthy();
    expect(statsFromDb).toHaveLength(winTestRecords.length);
});

test('gets lose stats', async () => {
    const loseTestRecords: Stat[] = statsDbRecords.filter((stat: Stat) => stat.type === StatType.LOSE);
    const statsFromDb = await db.getStats(StatType.LOSE);

    expect(Array.isArray(statsFromDb)).toBeTruthy();
    expect(statsFromDb).toHaveLength(loseTestRecords.length);
});

test('gets win stats count', async () => {
    const winTestRecords: Stat[] = statsDbRecords.filter((stat: Stat) => stat.type === StatType.WIN);
    const statsFromDbCount = await db.getStatsCount(StatType.WIN);

    expect(Array.isArray(statsFromDbCount)).toBeFalsy();
    expect(statsFromDbCount).toBe(winTestRecords.length);
});

test('gets lose stats count', async () => {
    const loseTestRecords: Stat[] = statsDbRecords.filter((stat: Stat) => stat.type === StatType.LOSE);
    const statsFromDbCount = await db.getStatsCount(StatType.LOSE);

    expect(Array.isArray(statsFromDbCount)).toBeFalsy();
    expect(statsFromDbCount).toBe(loseTestRecords.length);
});
