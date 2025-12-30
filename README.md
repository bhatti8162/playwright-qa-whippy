# Whippy Playwright E2E Tests

#### Introduction

The @whippy/e2e-tests package provides end-to-end (E2E) tests for web applications. Using the Playwright testing framework, it ensures that the entire application functions as expected from the perspective of the end-user.

#### What are E2E Tests?

End-to-end (E2E) tests simulate real user scenarios by testing the flow of an application from start to finish. Instead of focusing on isolated units or components like in unit or integration tests, E2E tests ensure that the entire application works cohesively from the user's perspective. This can include interactions such as clicking buttons, filling out forms, or navigating between pages.

#### What is Playwright?

Playwright is a Node library to automate the Chrome, Firefox, and WebKit browsers with a single API. It enables cross-browser web automation that is capable, reliable, and fast. Playwright is commonly used for E2E testing because it allows developers to automate user-like interactions with web applications, ensuring that applications function as expected in real-world scenarios. Some of Playwright's features include:

- Browser Automation: Automate tasks across different browsers.
- Network Interception: Observe and control browser network activity.
- Reliable Auto-wait: Ensures elements are ready before interactions.
- Screenshot and Video Capture: Useful for debugging and documentation purposes.

#### Scripts

Here's a breakdown of the npm scripts provided:

lint:fix: Uses ESLint to automatically fix possible code issues in .jsx, .js, .ts, and .tsx files. It respects the ignore configurations specified in .gitignore.

1. Lint (yarn lint:fix)

```bash
eslint ./ --ext .jsx,.js,.ts,.tsx --quiet --fix --ignore-path ./.gitignore
```

2. Code Formatting (yarn lint:format)

lint:format: Uses Prettier to format code files such as .js, .jsx, .ts, .tsx, .css, .md, and .json, ensuring consistent code styling.

```bash
prettier  --loglevel warn --write "./**/*.{js,jsx,ts,tsx,css,md,json}"
```

3. Spell Check (yarn lint:spell)

lint:spell: Utilizes cspell to check for spelling errors in your source files.

```bash
cspell "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}" --no-progress
```

4. Type Check (yarn type)

type: Uses TypeScript's compiler (tsc) to perform type checking on your TypeScript files. The --pretty flag makes the output more readable with formatting, and the --noEmit flag ensures that no compiled JavaScript files are outputted after the type check (meaning, it's just checking types without actually compiling the TypeScript to JavaScript).

```bash
tsc --pretty --noEmit
```

5. Code Quality (yarn lint)

lint: A composite script that sequentially runs lint:format, lint:fix, and lint:spell, providing comprehensive linting to ensure code quality.

```bash
yarn lint:format && yarn lint:fix && yarn lint:spell
```
