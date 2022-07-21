import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Transition } from "@headlessui/react";
import Grid from "../grid";
import Keyboard, { CMD_KEYS, keyboardLayout } from "./Keyboard";
import Row from "./Row";
import Replay from "./Replay";
import { db, StatType } from "../db";
import { Cell as RowCell } from "./RowCell";

type Props = {
    correctWord: string,
    handleCorrectWordChange: CallableFunction
}

type State = {
    grid: RowCell[][],
    colPointer: number,
    nextRowPointer: number,
    gameState: GameState,
}

enum GameState {
    WIN,
    LOSE,
    IN_PROGRESS
}

const TOASTS: Record<string, string> = {
    invalidWord: '😬 Not in dictionary.',
    rowNotComplete: '👀 Word is not complete.',
    [GameState.WIN]: '👑 You win!',
    [GameState.LOSE]: '😔 You lose, the word is ',
};

export default class Game extends React.Component<Props, State> {
    ROWS_COUNT = 6;
    ROW_MAX_LETTERS = 5;

    isGameShowing = false;

    constructor(props: Props) {
        super(props);

        this.state = this.initState();

        this.appendLetter = this.appendLetter.bind(this);
        this.popLetter = this.popLetter.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    componentDidMount(): void {
        this.startGame();
    }

    componentWillUnmount(): void {
        this.removeKeyboardEventListener();
    }

    removeKeyboardEventListener(): void {
        document.removeEventListener('keydown', this.handleKeyboard);
    }

    startGame(): void {
        this.setRandomWordToGuess();

        this.setState(this.initState());
        this.isGameShowing = true;

        document.addEventListener('keydown', this.handleKeyboard);
    }

    handleKeyboard(e: KeyboardEvent): void {
        const commandButtonHandlers = this.keyboardCommandKeyHandlers();

        const isAllowedKeyboardKey = (key: string): boolean => {
            return keyboardLayout.flat().includes(key);
        };

        const isCommandKey = (key: string): boolean => {
            return Object.values<string>(CMD_KEYS).includes(key);
        };

        if (isAllowedKeyboardKey(e.key)) {
            if (isCommandKey(e.key)) {
                commandButtonHandlers[e.key as CMD_KEYS]();
            } else {
                this.appendLetter(e.key);
            }
        }
    }

    initState(): State {
        return {
            grid: Grid.initGrid(this.ROWS_COUNT, this.ROW_MAX_LETTERS),
            colPointer: 0,
            nextRowPointer: 0,
            gameState: GameState.IN_PROGRESS,
        };
    }

    render() {
        return (
            <>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                closeOnClick
                theme="dark"
            />

            <Transition
                as="div"
                show={this.isGameShowing}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95"
            >
                <div className="flex flex-col" data-testid="grid">
                    {this.state.grid.map((rowCells: RowCell[], i: number) => {
                        return <Row key={i} index={i} rowCells={rowCells}></Row>;
                    })}
                </div>

                {this.state.gameState === GameState.IN_PROGRESS &&
                    <Keyboard
                        handleAppendLetter={this.appendLetter}
                        commandKeysHandlers={this.keyboardCommandKeyHandlers()}
                        submittedRows={this.getSubmittedRows()}
                    />}

                {this.state.gameState === GameState.LOSE &&
                    <Replay
                        handleReplay={this.startGame}
                        heading={{
                            text: TOASTS[GameState.LOSE] + this.props.correctWord,
                            className: "text-red-600",
                        }}
                    />}

                {this.state.gameState === GameState.WIN &&
                    <Replay
                        handleReplay={this.startGame}
                        heading={{
                            text: TOASTS[GameState.WIN],
                            className: "text-green-600",
                        }}
                        button={{
                            className: "bg-green-500 hover:bg-green-600 focus:bg-green-700",
                        }}
                    />}
            </Transition>
            </>
        );
    }

    async setRandomWordToGuess(): Promise<void> {
        const word = (await db.randomWord(this.ROW_MAX_LETTERS)).value;

        this.props.handleCorrectWordChange(word);
    }

    keyboardCommandKeyHandlers(): Record<CMD_KEYS, CallableFunction> {
        return {
            [CMD_KEYS.ENTER]: this.submitAnswer,
            [CMD_KEYS.BACKSPACE]: this.popLetter,
        };
    }

    appendLetter(letter: string): void {
        if (this.ROW_MAX_LETTERS > this.state.nextRowPointer) {
            this.setState({
                grid: Grid.appendLetter(this.state.grid, this.state.colPointer, this.state.nextRowPointer, letter),
                nextRowPointer: this.state.nextRowPointer + 1,
            });
        }
    }

    popLetter(): void {
        if (this.state.nextRowPointer !== 0) {
            this.setState({
                grid: Grid.removeLetter(this.state.grid, this.state.colPointer, this.state.nextRowPointer - 1),
                nextRowPointer: this.state.nextRowPointer - 1,
            });
        }
    }

    async submitAnswer(): Promise<void> {
        if (!this.isCurrentRowComplete()) {
            toast(TOASTS.rowNotComplete);
            return;
        } else if (! await this.doesWordExistsInDictionary(this.getCurrentRowCells())) {
            toast(TOASTS.invalidWord);
            return;
        }

        this.changeRowCellsStatuses();

        switch (this.determineGameStatus()) {
            case GameState.WIN:
                this.doWinActions();
                return;
            case GameState.LOSE:
                this.doLoseActions();
                return;
            default:
                this.goToNextRow();
        }
    }

    goToNextRow() {
        this.setState({ colPointer: this.state.colPointer + 1, nextRowPointer: 0 });
    }

    async doesWordExistsInDictionary(word: string): Promise<boolean> {
        return await db.wordExists(word);
    }

    isCurrentRowComplete(): boolean {
        return !Grid.hasRowEmptyLetters(this.state.grid, this.state.colPointer);
    }

    getCurrentRowCells(): string {
        return Grid.getRowCells(this.state.grid, this.state.colPointer)
            .map((rowCell: RowCell) => rowCell.letter)
            .join('');
    }

    changeRowCellsStatuses() {
        this.setState({
            grid: Grid.setAppropriateRowCellsStatuses(this.state.grid, this.state.colPointer, this.props.correctWord),
        });
    }

    determineGameStatus(): GameState {
        const doesGuessMatch = this.getCurrentRowCells() === this.props.correctWord;
        const hasReachedMaxCols = this.state.colPointer + 1 === this.ROWS_COUNT;

        return doesGuessMatch ? GameState.WIN : hasReachedMaxCols ? GameState.LOSE : GameState.IN_PROGRESS;
    }

    getSubmittedRows(): RowCell[][] {
        return Grid.takeRows(this.state.grid, this.state.colPointer);
    }

    doWinActions() {
        this.removeKeyboardEventListener();
        this.setState({ gameState: GameState.WIN });
        
        toast(TOASTS[GameState.WIN]);
        
        db.addStat(StatType.WIN);
    }

    doLoseActions() {
        this.removeKeyboardEventListener();
        
        this.setState({ gameState: GameState.LOSE });
        
        toast(TOASTS[GameState.LOSE] + this.props.correctWord);

        db.addStat(StatType.LOSE);
    }
}
