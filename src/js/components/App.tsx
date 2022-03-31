import React from "react"
import Game from "./Game"

const App: React.FC = () => {
    return (
        <div className="m-auto" style={{maxWidth: '500px'}}>
            <div className="flex justify-center items-center py-3">
                <div>
                    <h1 className="text-4xl font-bold text-gray-100 select-none">Wordle</h1>
                </div>
            </div>

            <Game></Game>
        </div>
    )
}

export default App