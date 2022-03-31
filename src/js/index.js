import ReactDOM from "react-dom"
import App from "./components/App"
import { db } from "./db"
import { importWordsToDB, prepareRecords } from "./wordsImporter"
import nouns from "./nouns"

(async() => {
    if (await db.words.count() === 0) {
        await importWordsToDB(prepareRecords(nouns))
    }
})()

const app = document.getElementById('app')

ReactDOM.render(<App />, app)