## Setup Instructions

1. Install the right npm version using NVM:
```
nvm install
nvm use
```
2. Run the app:
```
npm start
```

3. In browser go to localhost URL displayed in console. E.g. `http://localhost:5173`

## My technical decisions

* React as main tool
* Keeping state in components, no tool like Redux/Zustand used
* Vite project bundler

Implemented features:
* Map markers + List items user interaction
* EItems iltering (only category filtering for now, easy to add more filters, well-extendable)

## Improvement TODOs

* Improve items filtering: all "No items" text if a filetred set is empty
* Fix layout-jump on changing filter value
* better use TS, than pure JS - define custom types for props and state variables
* test with BrowserStack to ensure all features are widely supported
