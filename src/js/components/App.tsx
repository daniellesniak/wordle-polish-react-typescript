import React, { useState } from "react";
import Game from "./Game";
import { db } from "../db";
import { importWordsToDb } from "../wordsImporter";
import LoadingMessage from "./LoadingMessage";
import HelpModal from "./HelpModal";
import StatsModal from "./StatsModal";
import TheHeader from "./TheHeader";

let dictionary: string[] = [];
async function loadDictionary() { // parcel's dynamic import
    await import('../dictionary').then(d => {
        dictionary = d.default;
    });
}

const App: React.FC = () => {
    const [isDbInitialized, setIsDbInitialized] = useState(false);
    const [correctWord, setCorrectWord] = useState('');
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(true);
    const [isStatsModalOpen, setIsStatModalOpen] = useState(false);

    (async() => {
        if (await db.count() > 0) {
            setIsDbInitialized(true);
        } else {
            await loadDictionary();
            setIsDbInitialized(await importWordsToDb(dictionary));
        }
    })();

    return (
        <>
        <HelpModal isOpen={isHelpModalOpen} handleOpenHelpModal={setIsHelpModalOpen} />
        <StatsModal isOpen={isStatsModalOpen} handleOpenStatsModal={setIsStatModalOpen} />
        <TheHeader handleOpenHelpModal={setIsHelpModalOpen} handleOpenStatsModal={setIsStatModalOpen} />
        <div className="m-auto" style={{maxWidth: '500px'}}>
            
            { isDbInitialized 
                    ? <Game correctWord={correctWord} handleCorrectWordChange={setCorrectWord}></Game>
                    : <LoadingMessage message={'Initializing database, it may take a while'} withEllipsis={true}></LoadingMessage>
            }
        </div>
        </>
    );
};

export default App;
