import Dexie, { Table } from "dexie";

export interface Word {
    id?: number
    value: string
    length: number
}

export interface Stat {
    id?: number,
    type: StatType,
    created_at: number
}

export enum StatType {
    WIN = 'WIN',
    LOSE = 'LOSE'
}

export class WordleDexie extends Dexie {
    words!: Table<Word>;
    stats!: Table<Stat>;

    constructor() {
        super('wordle');
        
        this.version(1).stores({
            words: '++id, value, length',
            stats: '++id, type, created_at',
        });
    }

    async all(table = 'words'): Promise<Word[]> {
        return await this.table(table).toArray();
    }

    async count(table = 'words'): Promise<number> {
        return await this.table(table).count();
    }

    async randomWord(length: number): Promise<Word> {
        const all = await this.words.where('length').equals(length).toArray();

        return all[Math.floor(Math.random() * all.length)];
    }

    async wordExists(word: string): Promise<boolean> {
        return !! (await this.words.where('value').equals(word).first());
    }

    async addStat(type: StatType): Promise<void> {
        this.stats.add({
            type,
            created_at: Date.now(),
        });
    }

    async getStats(ofType: StatType = null) {
        if (! ofType) {
            return await this.all('stats');
        }

        return await this.stats.where('type').equals(ofType).toArray();
    }

    async getStatsCount(ofType: StatType) {
        return await this.stats.where('type').equals(ofType).count();
    }
}

export const db = new WordleDexie;
