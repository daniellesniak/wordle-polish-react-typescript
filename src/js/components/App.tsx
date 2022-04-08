import React, { useState } from "react"
import Game from "./Game"
import { db } from "../db"
import { importWordsToDB, prepareRecords } from "../wordsImporter"
import nouns from "../nouns"
import LoadingMessage from "./LoadingMessage"

const App: React.FC = () => {
    const [dbInitialized, setDbInitialized] = useState(false);

    (async() => {
        if (await db.words.count() > 0) {
            setDbInitialized(true)
        } else {
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
                    ? <Game></Game> 
                    : <LoadingMessage message={'Initializing database'}></LoadingMessage>
            }
        </div>
    )
}

export default App