# tic-tac-toe

## About

This project is an attempt to separate core logic from UI logic and ultimately consuming the same core logic from different web UI frameworks such as Vue js, React js and Svelte. However, this idea can also be extended to not just UI framework but different platform such as browser extension, VS code extension, desktop application, mobile application etc.

Benefits:

- since core logic is separate from UI logic, and core logic will hardly change, it will be easy to move from one UI framework to another (e.g. React to Vue) or from older version of the same framework to newer version (e.g. Vue Option API to Vue Composition API)
- share core logic for different platform (web: Vue, mobile: nativescript-vue, browser/vs-code extension: vanilla js, etc)

This project is highly influenced by Lachlan Miller's video on [Functional Core, Imperative Shell](https://www.youtube.com/watch?v=kPLGftyQ5ho) and [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Uncle Bob.

This project uses:

- monorepo (lerna & Yarn workspace)
- Test driven development
- Jest for unit testing
- Cypress for end to end testing
- prettier for code formatter
- eslint for static checking
- plantUML for documentation

This project has several packages:

- core
  where the core logic is implemented. The main approach is using object oriented programming. In the future, functional programming approach will also be implemented under @tic-tac-toe/core/fp
- web-test
  This is for end to end testing project using cypress. This test will be framework independent as long as each UI project uses same dat-test attributes.
- web-vanilla
  UI project without using any framework
- web-vue-3
  UI project using Vue js

## Project setup

- Installing dependencies

```
yarn
```

- Run all tests

```
yarn run lerna:test
```

- View PlantUML diagram (VS Code)
  Install [PlantUML extension](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml). Read on requirement section for further instruction. Once everything is installed, open any puml file, right click on the code and select Preview Current Diagram (Alt D)

### core

- run jest with watch mode

```
yarn run test:watch
```

### web-vanilla

- run development server

```
yarn run dev
```

- run end to end test

```
yarn run test
```

### web-vue-3

- run development server

```
yarn run dev
```

- run end to end test

```
yarn run test
```

## How to contribute

- Improve README file 😆
- Improve game.check() algorithm
- Add different UI framework

## How to add new package

- Create new folder under Packages
- cd into newly created folder
- run `yarn init`
- make sure change the name inside package.json with @tic-tac-toe prefix (please refer to other package.json)
- start developing the new package.
  Note: this project is using Yarn.

## How to add core package to another package

- run

```
lerna add @tic-tac-toe/core --scope=@tic-tac-toe/new_package_name
```
