import Dexie, { Table } from "dexie";

export interface Word {
    id?: number
    value: string
    length: number
}

export class WordleDexie extends Dexie {
    words!: Table<Word>;

    constructor() {
        super('wordle');
        
        this.version(1).stores({
            words: '++id, value, length',
        });
    }

    async all() {
        return await this.words.toArray();
    }

    async randomWord(length: number) {
        const all = await this.words.where('length').equals(length).toArray();

        return all[Math.floor(Math.random() * all.length)];
    }

    async exists(word: string) {
        return !! (await this.words.where('value').equals(word).first());
    }

    async count() {
        return await this.words.count();
    }
}

export const db = new WordleDexie;
