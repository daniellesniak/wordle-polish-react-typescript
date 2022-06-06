import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../Game";
import { db, type Word } from "../../db";
import { CMD_KEYS, keyboardLayout, KEY_BTN_DEFAULT_CLASS } from "../Keyboard";
import { rowLetterTypeClasses } from "../RowLetter";
import { RowLetterStatus } from "../Game";
import { keyboardKeyTypeClasses } from "../KeyboardKey";

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
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)
        console.log('Dictionary: ', await db.words.toArray())
    
        expect(await screen.findByTestId('grid')).toBeInTheDocument()
    });
    
    test('loads and display all rows', async () => {
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)

        for(let rowIndex = 0; rowIndex < COLS_COUNT; rowIndex++) {
            expect((await screen.findByTestId('row-' + (rowIndex + 1)))).toBeInTheDocument()
        }
    });

    test('loads and display all rowLetters', async () => {
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)

        for(let rowIndex = 0; rowIndex < COLS_COUNT; rowIndex++) {
            for (let rowLetterIndex = 0; rowLetterIndex < ROW_MAX_LETTERS; rowLetterIndex++) {
                expect((await screen.findByTestId('rowLetter-' + (rowIndex + 1) + (rowLetterIndex + 1)))).toBeInTheDocument()
            }
        }
    })

    test('loads and display keyboard', async () => {
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)

        expect((await screen.findByTestId('keyboard'))).toBeInTheDocument()
    })

    test('loads and display keyboard keys', async () => {
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)

        expect((await screen.findAllByTestId('keyboard-key')).length).toBe(keyboardLayout.flat().length)
    })
})

describe('keyboard input', () => {
    test('prints characters into grid\'s rowLetters', async () => {
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)
    
        const user = userEvent.setup()
    
        await user.keyboard('morze')
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    })
    
    test('submits guess by pressing enter', async () => {
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)
    
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
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)
    
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
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)
    
        const user = userEvent.setup()
    
        await user.click(document.querySelector('[id="keyboard-key-m"]'));
        await user.click(document.querySelector('[id="keyboard-key-o"]'));
        await user.click(document.querySelector('[id="keyboard-key-r"]'));
        await user.click(document.querySelector('[id="keyboard-key-z"]'));
        await user.click(document.querySelector('[id="keyboard-key-e"]'));
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    })

    test('submits guess by clicking enter', async () => {
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)
    
        const user = userEvent.setup({ delay: 10 })
    
        await user.click(document.querySelector('[id="keyboard-key-m"]'));
        await user.click(document.querySelector('[id="keyboard-key-o"]'));
        await user.click(document.querySelector('[id="keyboard-key-r"]'));
        await user.click(document.querySelector('[id="keyboard-key-z"]'));
        await user.click(document.querySelector('[id="keyboard-key-e"]'));
        
        await user.click(document.querySelector('[id="keyboard-key-enter"]'));
        
        await user.click(document.querySelector('[id="keyboard-key-o"]'));
        await user.click(document.querySelector('[id="keyboard-key-m"]'));
        await user.click(document.querySelector('[id="keyboard-key-l"]'));
        await user.click(document.querySelector('[id="keyboard-key-e"]'));
        await user.click(document.querySelector('[id="keyboard-key-t"]'));
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    
        expect((await screen.findByTestId('rowLetter-21')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-25')).textContent).toBe('t')
    })

    test('removes letters by clicking backspace', async () => { 
        render(<Game correctWord="doesntmatter" handleCorrectWordChange={(): null => null} />)
    
        const user = userEvent.setup({ delay: 10 })
    
        await user.click(document.querySelector('[id="keyboard-key-m"]'));
        await user.click(document.querySelector('[id="keyboard-key-o"]'));
        await user.click(document.querySelector('[id="keyboard-key-r"]'));
        await user.click(document.querySelector('[id="keyboard-key-z"]'));
        await user.click(document.querySelector('[id="keyboard-key-e"]'));
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    
        await user.click(document.querySelector('[id="keyboard-key-backspace"]'));
        await user.click(document.querySelector('[id="keyboard-key-backspace"]'));
    
        expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('m')
        expect((await screen.findByTestId('rowLetter-12')).textContent).toBe('o')
        expect((await screen.findByTestId('rowLetter-13')).textContent).toBe('r')
        expect((await screen.findByTestId('rowLetter-14')).textContent).not.toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).not.toBe('e')
    })
})

describe('win', () => {
    test("displays ReplayComponent with a 'win' heading and the ReplayButton in a case of win", async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)

        const user = userEvent.setup()

        await user.keyboard('morze{Enter}')

        expect((await screen.findByTestId('replay'))).toBeInTheDocument()
        expect((await screen.findByTestId('replay-heading')).textContent).toContain('win')
        expect((await screen.findByTestId('replay-button'))).toBeInTheDocument()
    })

    test('hides keyboard in case of win', async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)

        const user = userEvent.setup()

        await user.keyboard('morze{Enter}')

        expect((screen.queryByTestId('keyboard'))).not.toBeInTheDocument()
    })

    test("doesn't removes letters after win", async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)

        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('morze{Enter}{Backspace}{Backspace}')

        expect((await screen.findByTestId('rowLetter-14')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    })
})

describe('lose', () => {
    test("displays ReplayComponent with a 'lose' heading and the ReplayButton in case of lose", async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)

        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('omlet{Enter}arras{Enter}łyżka{Enter}iskra{Enter}mówka{Enter}bolid{Enter}')

        expect((await screen.findByTestId('replay'))).toBeInTheDocument()
        expect((await screen.findByTestId('replay-heading')).textContent).toContain('lose')
        expect((await screen.findByTestId('replay-button'))).toBeInTheDocument()
    })

    test('hides keyboard in case of lose', async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)

        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('omlet{Enter}arras{Enter}łyżka{Enter}iskra{Enter}mówka{Enter}bolid{Enter}')

        expect((screen.queryByTestId('keyboard'))).not.toBeInTheDocument()
    })

    test("doesn't removes letters after lose", async () => {
        render(<Game correctWord="omlet" handleCorrectWordChange={(): null => null} />)

        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('morze{Enter}morzemorze{Enter}morze{Enter}morze{Enter}morze{Enter}morze{Enter}{Backspace}{Backspace}')

        expect((await screen.findByTestId('rowLetter-64')).textContent).toBe('z')
        expect((await screen.findByTestId('rowLetter-65')).textContent).toBe('e')
    })
})

describe('coloring rowLetters', () => {
    test('colors correct letter at right position green', async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)
        
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
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)
        
        const shouldContainClasses = rowLetterTypeClasses()[RowLetterStatus.ELSEWHERE]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('omlet{Enter}')
        
        expect((await screen.findByTestId('rowLetter-11')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-12')).classList.value).toContain(shouldContainClasses)
        expect((await screen.findByTestId('rowLetter-14')).classList.value).toContain(shouldContainClasses)
    })

    test('colors absent letter gray', async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)
        
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
        render(<Game correctWord="iskra" handleCorrectWordChange={(): null => null} />)
        
        const shouldContainClasses = keyboardKeyTypeClasses(KEY_BTN_DEFAULT_CLASS)[RowLetterStatus.CORRECT]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('iskry{Enter}')
        
        expect((document.querySelector('#keyboard-key-i')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-s')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-k')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-r')).classList.value).toContain(shouldContainClasses)
    })

    test('colors keys orange when letter elsewhere', async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)
        
        const shouldContainClasses = keyboardKeyTypeClasses(KEY_BTN_DEFAULT_CLASS)[RowLetterStatus.ELSEWHERE]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('zerom{Enter}')
        
        expect((document.querySelector('#keyboard-key-z')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-e')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-o')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-m')).classList.value).toContain(shouldContainClasses)
    })
    
    test('colors keys gray when letter absent', async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)
        
        const shouldContainClasses = keyboardKeyTypeClasses(KEY_BTN_DEFAULT_CLASS)[RowLetterStatus.ABSENT]
        const user = userEvent.setup({ delay: 10 })

        await user.keyboard('bolid{Enter}')
        
        expect((document.querySelector('#keyboard-key-b')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-l')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-i')).classList.value).toContain(shouldContainClasses)
        expect((document.querySelector('#keyboard-key-d')).classList.value).toContain(shouldContainClasses)
    })

    test("doesn't color more than it should", async () => {
        render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)
        
        const allAbsent = "bolid"
        const allElswhere = "zerom"

        const shouldContainClasses = keyboardKeyTypeClasses(KEY_BTN_DEFAULT_CLASS)[RowLetterStatus.DEFAULT]
        const user = userEvent.setup({ delay: 10 })
        const keyboardKeys = keyboardLayout
                                .flat()
                                .filter(
                                    (key) => ! Object.values<string>(CMD_KEYS).includes(key) && 
                                             ! (allAbsent + allElswhere).split('').includes(key)
                                )
        
        await user.keyboard(allAbsent + '{Enter}')
        await user.keyboard(allElswhere + 'zerom{Enter}')

        keyboardKeys.forEach(key => {
            expect((document.querySelector('#keyboard-key-' + key)).classList.value).toContain(shouldContainClasses)
        });
    })
})

test("doesn't submit incomplete word", async () => {
    render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)
        
    const user = userEvent.setup({ delay: 10 })

    await user.keyboard('morz{Enter}e')

    expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('e')
    expect((await screen.findByTestId('rowLetter-21')).textContent).not.toBe('e')
})

test("doesn't submit word that does not exist in dictionary", async () => {
    render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)
        
    const user = userEvent.setup({ delay: 10 })

    await user.keyboard('pszów{Enter}e')

    expect((await screen.findByTestId('rowLetter-21')).textContent).not.toBe('e')
})

test('restarts a game', async () => {
    render(<Game correctWord="morze" handleCorrectWordChange={(): null => null} />)

    const user = userEvent.setup({ delay: 10 })

    await user.keyboard('morze{Enter}')

    await user.click(await screen.findByTestId('replay-button'))

    expect((await screen.findByTestId('rowLetter-11')).textContent).toBe('')
    expect((await screen.findByTestId('rowLetter-15')).textContent).toBe('')
})