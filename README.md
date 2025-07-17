# Tasty Trade Take Home Assessment 
This repo contains my (Michael Rechenberg's) submission for the tastytrade SWE take-home assessment.

The code is within the tasty-trade-assessment/ folder

# Setup and running the application
TODO: fill this out.  Mention workaround issue with corepack if needed

# Open-Source libraries used

## Svelte app framework (sveltekit)

sveltekit is used to give a basic project structure to the whole application.

## UI Component Library (shadcn-svelte)
shadcn-svelte is used for basic UI primitives like buttons and dropdowns, as well as for the watchlist table.

Note, that the way shadcn-svelte distributes code is to include the components' code inside the source of the consuming repo. So all the code in these files/filepaths are from shadcn-svelte, not me.
- src/lib/components/ui/*
- src/lib/hooks/*
- src/lib/utils.ts

Components under src/lib/components/ that are NOT in the ui/ folder were written by me.

## Data Fetching (svelte-query)
svelte-query is used for making requests to the TastyTrade API, since it provides nice methods for setting up polling and for tracking the status of outgoing requests.


