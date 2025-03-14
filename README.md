# Autarc Code Challenge

## Techstack

- React / TS through Vite
- Tailwind CSS for the main reason that Autarc uses it
- Node / Express to handle server side logic
- SQLite to handle local DB
- Jest to handle unit testing
- Socket IO for Websocket

## Setup

## client
```
npm install
npm run dev
```
go to localhost:5173

## server
```
npm install
node server.js
```
server runs on port localhost:5001

## Testing

```
npm run test
```

## General approach

I set up the frontend with React/TS with Vite. Then brokedown the application into multiple reusable components. When a comment thread was mentioned, my first thought was something like Reddit or Hackernews, so I modeled the design off that.

For the backend I used Node/Express and sqlite for the local DB. I did some research on which local DB to use and for this instance, sqlite was the most simplest. I thought about using RxDB cause that's what Autarc is using but sqlite seems more fitting for a small application.

The code is self documenting and I also added comments for better explanations.

## Future considerations given more time

- Dockerize the application for easier use and deployment
- Add more unit testing and add e2e testing
- Add core logic and edge cases for when websocket disconnects and also add testing
- Deploy to something like Vercel
