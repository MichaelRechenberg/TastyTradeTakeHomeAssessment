# Tasty Trade Take Home Assessment 
This repo contains my (Michael Rechenberg's) submission for the tastytrade SWE take-home assessment.

The code is within the tasty-trade-assessment/ folder

# Setup and running the application

For running the application, I used node version 24.4.1. pnpm is used as the package manager, so install that if you haven't already.

(one-time-setup): First, you'll have to navigate to the tasty-trade-assessment/ folder in your shell.
Then, run the following command to install all the dependencies
> pnpm i

Once the dependencies are installed, you can run
> pnpm run dev

This will start a local webserver serving up the application.

Now you can navigate to the application using a web browser by going to the URL http://localhost:5173/

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
svelte-query is used for making requests to the TastyTrade API, since it provides some convenient methods for querying. 


