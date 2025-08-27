# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` with feature folders: `components/`, `screens/`, `navigation/`, `hooks/`, `services/`, `api/`, `utils/`, `state/`, `styles/`, `theme/`, and `assets/` (fonts/images/animations).
- Entry points: `index.js` (registry) and `App.tsx` (providers + navigation).
- Tests: `__tests__/` (Jest). Example: `__tests__/App.test.tsx`.
- Native projects: `android/`, `ios/`. Metro config: `metro.config.js`.

## Build, Test, and Development Commands
- Start Metro: `npm start` — runs the bundler.
- Android: `npm run android` — builds and installs on a device/emulator.
- iOS: `npm run ios` — builds and runs in Simulator (macOS).
- Tests: `npm test` — runs Jest (preset `react-native`).
- Lint: `npm run lint` — ESLint over the repo.
- Format (on demand): `npx prettier --write .`.
- Link assets (fonts): `npx react-native-asset` (uses `react-native.config.js`).

## Coding Style & Naming Conventions
- TypeScript: `.ts`/`.tsx`; 2‑space indentation, single quotes, trailing commas (Prettier config).
- Linting: extends `@react-native` via `.eslintrc.js`; fix with `npx eslint . --fix`.
- Components/Screens: PascalCase files (e.g., `NextScreen.tsx`).
- Hooks: `useX.ts` (camelCase exports). Constants: UPPER_SNAKE_CASE. Utilities: lowerCamelCase.

## Testing Guidelines
- Framework: Jest with `preset: 'react-native'`.
- File names: `*.test.ts` or `*.test.tsx` colocated in `__tests__/` or near sources.
- Run with coverage: `npm test -- --coverage`.
- Prefer pure functions and testable UI (React Test Renderer examples included).

## Commit & Pull Request Guidelines
- Commit style (observed): `[type] short imperative message`, e.g. `[add] splash screen and lottie`, `[setup] project`.
- Keep commits focused; reference issues in body (e.g., `Fixes #123`).
- PRs must include: clear summary, screenshots for UI changes, steps to verify, and linked issues.
- Ensure CI sanity: run `npm run lint` and `npm test` locally before requesting review.

## Architecture Overview & Tips
- UI: UI Kitten (`@ui-kitten/components`) with Eva theme; custom theme/mapping in `src/theme/`.
- Navigation: `@react-navigation/native` + stack in `src/navigation/`.
- Assets: fonts in `src/assets/fonts` (configured in `react-native.config.js`). Avoid committing secrets; keep environment-specific config out of source.

