# tic-tac-toe

## About

This project is an attempt to separate core logic from UI logic and ultimately consuming the same core logic from different web UI frameworks such as Vue js, React js and Svelte. However, this idea can also be extended to not just UI framework but different platform such as browser extension, VS code extension, desktop application, mobile application etc.

This project is highly influenced by Lachlan Miller's video on [Functional Core, Imperative Shell](https://www.youtube.com/watch?v=kPLGftyQ5ho).

This project uses:

- monorepo (lerna & Yarn workspace)
- Test driven development
- Jest for unit testing
- Cypress for end to end testing
- prettier for code formatter
- eslint for static checking
- plantUML for documentation

## Project setup

### Bootstrapping lerna repo

```
lerna bootstrap
```

## Run all tests

```
yarn run lerna:test
```
