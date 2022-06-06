import React, { useState } from "react"
import Game from "./Game"
import { db } from "../db"
import { importDictionaryToDb } from "../wordsImporter"
import LoadingMessage from "./LoadingMessage"

let dictionary: string[] = []
async function loadDictionary() { // parcel's dynamic import
    await import('../dictionary').then(d => {
        dictionary = d.default
    })
}

const App: React.FC = () => {
    const [isDbInitialized, setIsDbInitialized] = useState(false);
    const [correctWord, setCorrectWord] = useState('');

    (async() => {
        if (await db.count() > 0) {
            setIsDbInitialized(true)
        } else {
            await loadDictionary()
            setIsDbInitialized(await importDictionaryToDb(dictionary))
        }
    })()

    return (
        <div className="m-auto" style={{maxWidth: '500px'}}>
            <div className="flex justify-center items-center py-3">
                <div>
                    <h1 className="text-4xl font-bold text-gray-100 select-none">Wordle PL</h1>
                </div>
            </div>
            
            { isDbInitialized 
                    ? <Game correctWord={correctWord} handleCorrectWordChange={setCorrectWord}></Game>
                    : <LoadingMessage message={'Initializing database, it may take a while'}></LoadingMessage>
            }
        </div>
    )
}

export default App