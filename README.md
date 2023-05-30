# The Game of WAR

This is the 3rd project in Module 9 (Working with APIs) of Scrimba's [Frontend Developer Path](https://scrimba.com/learn/frontend). This project focused on using the `fetch` API to get data from the __Deck of Cards API__ to create a simplified version of the __Game of War__. In this version, a card is drawn from a deck for each player. The player with the higher-value card wins the round and gets a point. The winner of the game is the player with the higher score.

I veered from the proposed way that the project was built and structured my implementation in a way that makes sense to me, that I've used before. The original version makes use of event listeners that also execute code to act on user input from directly within the listener. I prefer to separate event handlers and event listeners, to make them more independent, so that they can be used by other functions as needed. I view this as being more specific as well. An event handler plays a different role from an event listener, so it makes sense to me that they exist as separate functions.

The layout of my implementation is different from the layout proposed by Scrimba. I also added end-game screens for wins by player 1 or player 2, as well as a screen for tied games. Completed games include a button to begin a new game, as well.

Deployed at: https://vish213-war.netlify.app/

## JavaScript concepts

- variables
- functions
- arrays
    - indexOf()
- if statements
- if/else statements
- fetch
    - .then()
    - .json()
- document.getElementById()
- element
    - .addEventListener
    - .innerText
    - .innerHtml
    - .disabled
    - .classList
        - .remove()
        - .add()
    - .src
    - .style
        .color
- location.reload()
- string template literals