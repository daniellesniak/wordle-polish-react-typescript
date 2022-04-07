import { determineHighlightClass } from "../src/js/components/Keyboard"
import { typeClasses, Type } from "../src/js/components/Letter"

const guesses: Array<Array<string>> = [
    ['f', 'i', 'd', 'ż', 'i']
]

it('returns default class when button\'s letter not appears in guesses', () => {
    expect(determineHighlightClass('x', guesses, 'brest'.split(''))).toBe(typeClasses['default'])
})

it('returns CORRECT class when button\'s letter occurs in guesses and position is right', () => {
    expect(determineHighlightClass(guesses[0][0], guesses, guesses[0])).toBe(typeClasses[Type.CORRECT])
})