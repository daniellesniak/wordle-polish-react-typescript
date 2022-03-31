import Dexie, { Table } from "dexie"

export interface Word {
    id?: number
    value: string
    length: number
}

export class WordleDexie extends Dexie {
    words!: Table<Word>

    constructor() {
        super('wordle')
        
        this.version(1).stores({
            words: '++id, value, length'
        })
    }
}

export const db = new WordleDexie