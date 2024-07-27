# Project Name

## Getting Started

- `npm install` - install all dependencies
- `npm run build:watch` - interactive watch mode to automatically transpile source files
- `npm start` - run dev env locally
  <br>
  <br>
- `npm run lint` - lint source files and tests
- `npm run prettier` - reformat files
- `npm run test` - run tests
- `npm run test:watch` - interactive watch mode to automatically re-run tests

## Test Coverage

| File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| --------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files             | 100     | 100      | 100     | 100     |
| src                   | 100     | 100      | 100     | 100     |
| main.ts               | 100     | 100      | 100     | 100     |
| src/business          | 100     | 100      | 100     | 100     |
| catalogue.ts          | 100     | 100      | 100     | 100     |
| marketingCampaigns.ts | 100     | 100      | 100     | 100     |
| src/libs              | 100     | 100      | 100     | 100     |
| pricingRules.ts       | 100     | 100      | 100     | 100     |

## Architecture

![architecture](./architecture.jpg?raw=true)

- `main.ts` - the engine to init the project
- `/business/catalogue.ts` - the central place defining all products, maintained by procurement department
- `/business/marketingCampaigns.ts` - the central place defining all product promotion, maintained by sales department
- `/lib/pricingRules.ts` - it configures the pricing rules, read parameters from `marketingCampaigns.ts`
