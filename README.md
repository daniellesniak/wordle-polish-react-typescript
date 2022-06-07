# Wordle PL
A Wordle clone with polish dictionary made in Typescript, React and Tailwind.

You can play it here: https://daniellesniak.github.io/wordle-polish-react-typescript/

## Build and run
#### Run Locally

Clone the repository:
```bash
git clone https://github.com/daniellesniak/wordle-polish-react-typescript.git wordle
```

Install dependencies and start the app:
```bash
cd wordle
yarn install
yarn start
```

Now you should be able to play at http://localhost:1234.

#### Build
Simply type `yarn build` and execute. Build files should be in `dist` folder.

#### Tests
To run tests type `yarn test` and execute.

## Custom dictionary
If you want your own dictionary you have to edit `./src/js/dictionary.js` file and replace value of `words` variable.

Words need to be in the following format:
```typescript
const words = "wordone,wordtwo,wordthree" // no whitespaces, only alpha letters (no numbers, no signs) splitted by the comma
```
The dictionary is loaded to the IndexedDB only once at the first launch of the game, so to reflect change, firstly you need to clear IndexedDB's `words` column.

To do this on a page in Chrome:
```
Press F12 to open Developer tools
Go to Application tab
Storage -> IndexedDB -> Wordle -> Right click on 'words' and click 'Clear'
F5 Refresh the page (app will import new dictionary to the IndexedDB) 
```

## Stack
- Parcel.js [[Home](https://parceljs.org/), [GitHub](https://github.com/parcel-bundler/parcel)]
- Typescript [[Home](https://www.typescriptlang.org/), [GitHub](https://github.com/microsoft/TypeScript)]
- React [[Home](https://reactjs.org/), [GitHub](https://github.com/facebook/react/)]
- TailwindCSS [[Home](https://tailwindcss.com/), [GitHub](https://github.com/tailwindlabs/tailwindcss)]
- jest [[Home](https://jestjs.io/), [GitHub](https://github.com/facebook/jest)]
- Testing Library [[Home](https://testing-library.com/), [GitHub](https://github.com/testing-library)]
- ESLint [[Home](https://eslint.org/), [GitHub](https://github.com/eslint/eslint)]
