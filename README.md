# Bad Ping Pong Game

Welcome to **Bad Ping Pong** – a unique twist on the classic Pong game where you'll experience the challenges of bad ping affecting your gameplay. In this game, you'll face varying levels of delay as you play, making it a fun and challenging experience.

## Table of Contents

- [Introduction](#bad-ping-pong-game)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Game](#running-the-game)
- [How to Play](#how-to-play)
- [Game Mechanics](#game-mechanics)
- [Project Details](#project-details)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Installation

To run **Bad Ping Pong** on your local machine, follow these simple steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/chrisjhchung/bad-ping-pong.git
   ```

2. Change to the project directory:

   ```bash
   cd bad-ping-pong
   ```

3. Install the project dependencies:

   ```bash
   yarn install
   ```

### Running the Game

Once you've installed the dependencies, you can run the game locally using the following command:

```bash
yarn run dev
```

This command will start the development server and open the game in your default web browser.

## How to Play

The objective of **Bad Ping Pong** is simple – try to score points against your opponent, just like in regular Pong. However, the twist is the simulated bad ping.

## Game Mechanics

- The game features an internet bar at the top with three bars.
- If the internet bar is at **3 bars**, the game plays like a normal game of Pong with no input delay.
- If the internet bar drops to **1 bar**, your inputs will be significantly delayed, simulating bad ping.
- If the internet bar is somewhere in the middle, your inputs will have varying degrees of delay, providing a unique challenge.

This game challenges your reflexes and adaptability as you navigate through different levels of input delay.

## Project Details

- **Build Tool**: This project is built using [Vite](https://vitejs.dev/).
- **Frontend Frameworks**: React, Three.js
- **Dependencies**:
  - `@react-three/fiber`
  - `react`
  - `react-dom`
  - `three`
- **Development Dependencies**:
  - `@types/react`
  - `@types/react-dom`
  - `@vitejs/plugin-react`
  - `eslint` and related plugins

## Deployment

You can play **Bad Ping Pong** online on GitHub Pages by visiting the following link: [Bad Ping Pong](https://chrisjhchung.github.io/bad-ping-pong/).

## Contributing

Contributions to the project are welcome! If you'd like to contribute, please follow the standard GitHub fork and pull request workflow. Make sure to create clear and concise pull requests with detailed explanations.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it according to the terms of the license.

Thank you for playing **Bad Ping Pong**! We hope you enjoy the challenge of dealing with bad ping while trying to score against your opponent. Have fun!