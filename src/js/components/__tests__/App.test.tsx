import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../Game";
import { db, type Word } from "../../db";
import { CMD_BTNS, keyboardLayout, KEY_BTN_DEFAULT_CLASS } from "../Keyboard";
import { rowLetterTypeClasses } from "../Letter";
import { RowLetterStatus } from "../Game";
import { keyboardButtonTypeClasses } from "../KeyboardButton";

const dictionary: Word[] = [
    {
        value: 'morze',
        length: 'morze'.length
    },
    {
        value: 'zerom',
        length: 'zerom'.length
    },
    {
        value: 'omlet',
        length: 'omlet'.length
    },
    {
        value: 'arras',
        length: 'arras'.length
    },
    {
        value: 'łyżka',
        length: 'łyżka'.length
    },
    {
        value: 'iskra',
        length: 'iskra'.length
    },
    {
        value: 'iskry',
        length: 'iskry'.length
    },
    {
        value: 'mówka',
        length: 'mówka'.length
    },
    {
        value: 'bolid',
        length: 'bolid'.length
    }
]

const COLS_COUNT = 6
const ROW_MAX_LETTERS = 5

db.words.bulkAdd(dictionary);

describe('loads and display', () => {
    test('loads and display grid', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)
        console.log('Dictionary: ', await db.words.toArray())
    
        expect(await screen.findByTestId('grid')).toBeInTheDocument()
    });
    
    test('loads and display all rows', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)

        for(let rowIndex = 0; rowIndex < COLS_COUNT; rowIndex++) {
            expect((await screen.findByTestId('row-' + (rowIndex + 1)))).toBeInTheDocument()
        }
    });

    test('loads and display all rowLetters', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)

        for(let rowIndex = 0; rowIndex < COLS_COUNT; rowIndex++) {
            for (let rowLetterIndex = 0; rowLetterIndex < ROW_MAX_LETTERS; rowLetterIndex++) {
                expect((await screen.findByTestId('rowLetter-' + (rowIndex + 1) + (rowLetterIndex + 1)))).toBeInTheDocument()
            }
        }
    })

    test('loads and display keyboard', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)

        expect((await screen.findByTestId('keyboard'))).toBeInTheDocument()
    })

    test('loads and display keyboard rowLetter button', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)

        expect((await screen.findAllByTestId('keyboard-button')).length).toBe(keyboardLayout.flat().length)
    })
})

describe('keyboard input', () => {
    test('prints characters into grid\'s rowLetters', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)
    
        const user = userEvent.setup()
    
        await user.keyboard('morze')
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    })
    
    test('submits guess by pressing enter', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)
    
        const user = userEvent.setup({ delay: 10 })
    
        await user.keyboard('morze{Enter}omlet')
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    
        expect((await screen.findByTestId('rowLetter-21')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-25')).textContent).toBe('t')
    })
    
    test('removes letters by pressing backspace', async () => { 
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)
    
        const user = userEvent.setup()
    
        await user.keyboard('morze')
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    
        await user.keyboard('{Backspace}{Backspace}')
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).not.toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).not.toBe('e')
    })
})

describe('mouse input', () => {
    test('prints characters into grid\'s rowLetters', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)
    
        const user = userEvent.setup()
    
        await user.click(document.querySelector('[id="keyboard-button-m"]'));
        await user.click(document.querySelector('[id="keyboard-button-o"]'));
        await user.click(document.querySelector('[id="keyboard-button-r"]'));
        await user.click(document.querySelector('[id="keyboard-button-z"]'));
        await user.click(document.querySelector('[id="keyboard-button-e"]'));
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    })

    test('submits guess by clicking enter', async () => {
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)
    
        const user = userEvent.setup({ delay: 10 })
    
        await user.click(document.querySelector('[id="keyboard-button-m"]'));
        await user.click(document.querySelector('[id="keyboard-button-o"]'));
        await user.click(document.querySelector('[id="keyboard-button-r"]'));
        await user.click(document.querySelector('[id="keyboard-button-z"]'));
        await user.click(document.querySelector('[id="keyboard-button-e"]'));
        
        await user.click(document.querySelector('[id="keyboard-button-enter"]'));
        
        await user.click(document.querySelector('[id="keyboard-button-o"]'));
        await user.click(document.querySelector('[id="keyboard-button-m"]'));
        await user.click(document.querySelector('[id="keyboard-button-l"]'));
        await user.click(document.querySelector('[id="keyboard-button-e"]'));
        await user.click(document.querySelector('[id="keyboard-button-t"]'));
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    
        expect((await screen.findByTestId('rowLetter-21')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-25')).textContent).toBe('t')
    })

    test('removes letters by clicking backspace', async () => { 
        render(<Game wordToGuess="doesntmatter" handleWordToGuessChange={(): null => null} />)
    
        const user = userEvent.setup({ delay: 10 })
    
        await user.click(document.querySelector('[id="keyboard-button-m"]'));
        await user.click(document.querySelector('[id="keyboard-button-o"]'));
        await user.click(document.querySelector('[id="keyboard-button-r"]'));
        await user.click(document.querySelector('[id="keyboard-button-z"]'));
        await user.click(document.querySelector('[id="keyboard-button-e"]'));
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    
        await user.click(document.querySelector('[id="keyboard-button-backspace"]'));
        await user.click(document.querySelector('[id="keyboard-button-backspace"]'));
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).not.toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).not.toBe('e')
    })
})

describe('win', () => {
    test('displays replay with \'win\' phrase and replay button in case of win', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)

        const user = userEvent.setup()

        await user.keyboard('morze{Enter}')

        expect((await screen.findByTestId('replay'))).toBeInTheDocument()
        expect((await screen.findByTestId('replay-heading')).textContent).toContain('win')
        expect((await screen.findByTestId('replay-button'))).toBeInTheDocument()
    })

    test('hides keyboard in case of win', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)

        const user = userEvent.setup()

        await user.keyboard('morze{Enter}')

        expect((screen.queryByTestId('keyboard'))).not.toBeInTheDocument()
    })
})

describe('lose', () => {
    test('displays replay with \'lose\' phrase and replay button in case of lose', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)

        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('omlet{Enter}arras{Enter}łyżka{Enter}iskra{Enter}mówka{Enter}bolid{Enter}')

        expect((await screen.findByTestId('replay'))).toBeInTheDocument()
        expect((await screen.findByTestId('replay-heading')).textContent).toContain('lose')
        expect((await screen.findByTestId('replay-button'))).toBeInTheDocument()
    })

    test('hides keyboard in case of win', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)

        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('omlet{Enter}arras{Enter}łyżka{Enter}iskra{Enter}mówka{Enter}bolid{Enter}')

        expect((screen.queryByTestId('keyboard'))).not.toBeInTheDocument()
    })
})

describe('coloring rowLetters', () => {
    test('colors correct letter at right position green', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)
        
        const shouldContainClasses = rowLetterTypeClasses()[RowLetterStatus.CORRECT]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('morze{Enter}')
        
        expect((await screen.findByTestId('rowLetter-11')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-12')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-13')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-14')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-15')).classList.value).toContain(shouldContainClasses)
    })

    test('colors correct letter elsewhere orange', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)
        
        const shouldContainClasses = rowLetterTypeClasses()[RowLetterStatus.ELSEWHERE]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('omlet{Enter}')
        
        expect((await screen.findByTestId('rowLetter-11')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-12')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-14')).classList.value).toContain(shouldContainClasses)
    })

    test('colors absent letter gray', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)
        
        const shouldContainClasses = rowLetterTypeClasses()[RowLetterStatus.ABSENT]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('łyżka{Enter}')
        
        expect((await screen.findByTestId('rowLetter-11')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-12')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-13')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-14')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-15')).classList.value).toContain(shouldContainClasses)
    })
})

describe('coloring keyboard keys', () => {
    test('colors keys green when correct letter at right position', async () => {
        render(<Game wordToGuess="iskra" handleWordToGuessChange={(): null => null} />)
        
        const shouldContainClasses = keyboardButtonTypeClasses(KEY_BTN_DEFAULT_CLASS)[RowLetterStatus.CORRECT]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('iskry{Enter}')
        
        expect((document.querySelector('#keyboard-button-i')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-s')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-k')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-r')).classList.value).toContain(shouldContainClasses)
    })

    test('colors keys orange when letter elsewhere', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)
        
        const shouldContainClasses = keyboardButtonTypeClasses(KEY_BTN_DEFAULT_CLASS)[RowLetterStatus.ELSEWHERE]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('zerom{Enter}')
        
        expect((document.querySelector('#keyboard-button-z')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-e')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-o')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-m')).classList.value).toContain(shouldContainClasses)
    })
    
    test('colors keys gray when letter absent', async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)
        
        const shouldContainClasses = keyboardButtonTypeClasses(KEY_BTN_DEFAULT_CLASS)[RowLetterStatus.ABSENT]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('bolid{Enter}')
        
        expect((document.querySelector('#keyboard-button-b')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-l')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-i')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-button-d')).classList.value).toContain(shouldContainClasses)
    })

    test("doesn't color more than it should", async () => {
        render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)
        
        const allAbsent = "bolid"
        const allElswhere = "zerom"

        const shouldContainClasses = keyboardButtonTypeClasses(KEY_BTN_DEFAULT_CLASS)[RowLetterStatus.DEFAULT]
        const user = userEvent.setup({ delay: 10 })
        const keyboardKeys = keyboardLayout
                                .flat()
                                .filter(
                                    (key) => ! Object.values<string>(CMD_BTNS).includes(key) && 
                                             ! (allAbsent + allElswhere).split('').includes(key)
                                )
        
        await user.keyboard(allAbsent + '{Enter}')
        await user.keyboard(allElswhere + 'zerom{Enter}')

        keyboardKeys.forEach(key => {
            expect((document.querySelector('#keyboard-button-' + key)).classList.value).toContain(shouldContainClasses)
        });
    })
})

test("doesn't submit incomplete word", async () => {
    render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)
        
    const user = userEvent.setup({ delay: 10 })

    await user.keyboard('morz{Enter}e')

    expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    expect((await screen.findByTestId('rowLetter-21')).textContent).not.toBe('e')
})

test("doesn't submit word that does not exist in dictionary", async () => {
    render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)
        
    const user = userEvent.setup({ delay: 10 })

    await user.keyboard('pszów{Enter}e')

    expect((await screen.findByTestId('rowLetter-21')).textContent).not.toBe('e')
})

test('restarts a game', async () => {
    render(<Game wordToGuess="morze" handleWordToGuessChange={(): null => null} />)

    const user = userEvent.setup({ delay: 10 })

    await user.keyboard('morze{Enter}')

    await user.click(await screen.findByTestId('replay-button'))

    expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('')
    expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('')
})