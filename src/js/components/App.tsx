import React, { useState } from "react"
import Game from "./Game"
import { db } from "../db"
import { importWordsToDB, prepareRecords } from "../wordsImporter"
// import nouns from "../nouns"
import LoadingMessage from "./LoadingMessage"

let nouns: string[] = []
async function loadNouns() { // dynamic parcel's import
    await import('../nouns').then(d => {
        console.log(d.default)
        nouns = d.default
    })
}

const App: React.FC = () => {
    const [dbInitialized, setDbInitialized] = useState(false);
    const [wordToGuess, setWordToGuess] = useState('');

    (async() => {
        if (await db.words.count() > 0) {
            setDbInitialized(true)
        } else {
            await loadNouns()
            setDbInitialized(await importWordsToDB(prepareRecords(nouns)))
        }
    })()

    return (
        <div className="m-auto" style={{maxWidth: '500px'}}>
            <div className="flex justify-center items-center py-3">
                <div>
                    <h1 className="text-4xl font-bold text-gray-100 select-none">Wordle PL</h1>
                </div>
            </div>
            
            { dbInitialized 
                    ? <Game wordToGuess={wordToGuess} handleWordToGuessChange={setWordToGuess}></Game>
                    : <LoadingMessage message={'Initializing database, it may take a while'}></LoadingMessage>
            }
        </div>
    )
}

export default App