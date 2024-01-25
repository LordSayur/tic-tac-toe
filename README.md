# tic-tac-toe

## About

This project aims to decouple the core logic from the UI logic, enabling the consumption of the same core logic across various web UI frameworks such as Vue.js, React.js, and Svelte. Moreover, this approach can be extended not only to different UI frameworks but also to various platforms like browser extensions, VS Code extensions, desktop applications, and mobile applications.

### Benefits:

- **Separation of Concerns:**
  Since core logic is isolated from UI logic, transitioning between UI frameworks (e.g., from React to Vue) or upgrading within the same framework becomes seamless.

- **Code Reusability:**
  The core logic can be shared across different platforms, facilitating development for web, mobile, browser extensions, VS Code extensions, etc.

### Influences:

This project draws inspiration from Lachlan Miller's concept of [Functional Core, Imperative Shell](https://www.youtube.com/watch?v=kPLGftyQ5ho) and Uncle Bob's [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

### Technologies Used:

- **Monorepo (pnpm workspace)**
- **Test Driven Development**
- **Jest for Unit Testing**
- **Cypress for End-to-End Testing**
- **Prettier for Code Formatting**
- **ESLint for Static Code Checking**
- **PlantUML for Documentation**

### Project Structure:

- **core:**
  Contains the core logic implemented using object-oriented programming. Future plans include implementing a functional programming approach under `@tic-tac-toe/core/fp`.

- **web-test:**
  An end-to-end testing project using Cypress. Framework-independent as long as UI projects use the same data-test attributes.

- **web-vanilla:**
  A UI project without using any framework.

- **web-vue-3:**
  A UI project using Vue.js.

## Project Setup

### Installing Dependencies

```bash
# At root folder
pnpm install
```

- Running Tests

```bash
# At root folder
pnpm run test
```

- Viewing PlantUML Diagram (VS Code)
  Install the [PlantUML extension](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml), and follow the requirements section for further instructions. Once installed, open any `.puml` file, right-click on the code, and select "Preview Current Diagram" (Alt + D).

### core

- Run jest with watch mode:

```bash
pnpm run test:watch
```

### web-vanilla

- Run development server:

```bash
pnpm run dev
```

- Run end-to-end tests:

```bash
pnpm run test
```

### web-vue-3

- Run development server:

```bash
pnpm run dev
```

- Run end-to-end tests:

```bash
pnpm run test
```

## How to contribute

- Improve README file 😆
- Improve the `game.check()` algorithm
- Add support different UI frameworks

## How to add new App

- Create new project folder under apps
- Ensure to change the name inside `package.json` with `@tic-tac-toe` prefix (refer to other `package.json` files)
- Start developing the new package.

Note: This project is using pnpm.

## How create new app using vite and link core package

- Navigate to `apps` folder

- Run following command and follow the instructions:

```bash
pnpm create vite
```

- Navigate to newly created project
- Open `package.json` file and rename `name` property and append `@tic-tac-toe` to the current name.

```json
# example
{
  "name": "@tic-tac-toe/web-react",
  ...
}
```

- Add test script to your `package.json` file:

```json
{
  "name": "@tic-tac-toe/web-react",
  "version": "0.0.0",
  "scripts": {
    ...
    "test": "concurrently -k -s first \"pnpm run build && pnpm run serve --port 5000\" \"cd ../web-test && pnpm run cypress:run --config baseUrl=http://localhost:5000,video=false\""
  },
 ...
}
```

- Link core package to the newly created app

```bash
pnpm link @tic-tac-toe/core
```

- Start development
