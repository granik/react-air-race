## Setup Instructions

1. Install the right npm version using NVM, run npm install:
```
nvm install
nvm use
```

```
npm install
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
* Items filtering (only category for now, easy to add more filters, well-extendable)

## Improvement TODOs

* Improve items filtering: all "No items" text if a filetred set is empty
* Fix layout-jump on changing filter value
* make map dragding convenient
* implement list pagination
* better use TS, than pure JS - define custom types for props and state variables
* test with BrowserStack to ensure all features are widely supported
