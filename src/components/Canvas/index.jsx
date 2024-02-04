import { useRef, useEffect, useState } from "react";
import styles from "./index.module.css";
import Brick from "../Brick";
import Ball from "../Ball";
import useEventListener from "../../hooks/useEventListener";

const PLAYER_MOVEMENT_KEYS = ["w", "s"];
const OPPONENT_MOVEMENT_KEYS = ["ArrowUp", "ArrowDown"];
const TRANSLATE_STEP = 5;
const PING_VALUES = [0, 500, 1000];

const Canvas = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [ping, setPing] = useState(0);

  const player = useRef();
  const playerY = useRef(45);

  const opponent = useRef();
  const opponentY = useRef(45);

  const ball = useRef();

  function handler({ key }) {
    if (key === " ") {
      setIsPaused((prev) => !prev);
    }

    if (!isPaused) {
      if (PLAYER_MOVEMENT_KEYS.includes(key)) {
        if (key === "w") {
          playerY.current = Math.max(playerY.current - TRANSLATE_STEP, 0);
        } else if (key === "s") {
          playerY.current = Math.min(
            playerY.current + TRANSLATE_STEP,
            90 - 10 / 3
          );
        }
        setTimeout(() => {
          player.current.style.transform = `translateY(${playerY.current}vh)`;
        }, ping);
      }

      if (OPPONENT_MOVEMENT_KEYS.includes(key)) {
        if (key === "ArrowUp") {
          opponentY.current = Math.max(opponentY.current - TRANSLATE_STEP, 0);
        } else if (key === "ArrowDown") {
          opponentY.current = Math.min(
            opponentY.current + TRANSLATE_STEP,
            90 - 10 / 3
          );
        }
        setTimeout(() => {
          opponent.current.style.transform = `translateY(${opponentY.current}vh)`;
        }, ping);
      }
    }
  }
  const yDir = useRef(0);
  const xDir = useRef(1);

  const BALL_SPEED_X = 1;
  const BALL_SPEED_Y = 1;

  const getBallPosition = () => {
    const ballTransformValue = ball.current.style.transform;
    const ballRegex = /translate\(([-\d.]+vw), ([-\d.]+vh)\)/;
    const [, ballCurrentX, ballCurrentY] = ballTransformValue.match(
      ballRegex
    ) || [
      null,
      `${Math.round((50 - 5 / 3) / 5) * 5}vh`,
      `${Math.round((50 - 5 / 3) / 5) * 5}vh`,
    ];
    return { x: parseInt(ballCurrentX), y: parseInt(ballCurrentY) };
  };

  const getOpponentPosition = () => {
    const oppositionTransformValue = opponent.current.style.transform;
    const oppositionRegex = /translateY\(([\d.]+vh)\)/;
    const [, oppositionCurrentY] = oppositionTransformValue.match(
      oppositionRegex
    ) || [null, "45"];
    return parseInt(oppositionCurrentY);
  };

  const getPlayerPosition = () => {
    const playerTransformValue = player.current.style.transform;
    const playerRegex = /translateY\(([\d.]+vh)\)/;
    const [, playerCurrentY] = playerTransformValue.match(playerRegex) || [
      null,
      "45",
    ];
    return parseInt(playerCurrentY);
  };

  const updateBallPosition = () => {
    const { x: ballCurrentX, y: ballCurrentY } = getBallPosition();

    if (ballCurrentX >= 100 - 15 / 3) {
      const oppositionCurrentY = getOpponentPosition();
      console.log(
        "ballCurrentY, oppositionCurrentY",
        ballCurrentY,
        oppositionCurrentY
      );
      if (
        Math.round((ballCurrentY - 5 / 3) / 5) * 5 -
          (oppositionCurrentY + 5) ===
        -5
      ) {
        yDir.current -= 1;
      }
      if (
        Math.round((ballCurrentY - 5 / 3) / 5) * 5 -
          (oppositionCurrentY + 5) ===
        5
      ) {
        yDir.current += 1;
      } else if (
        Math.round((ballCurrentY - 5 / 3) / 5) * 5 -
          (oppositionCurrentY + 5) !==
        0
      ) {
        setPlayerScore((prev) => prev + 1);
      }
      xDir.current = -1;
    } else if (ballCurrentX <= 0 + 10 / 3) {
      const playerCurrentY = getPlayerPosition();
      if (
        Math.round((ballCurrentY - 5 / 3) / 5) * 5 - (playerCurrentY + 5) ===
        -5
      ) {
        yDir.current -= 1;
      } else if (
        Math.round((ballCurrentY - 5 / 3) / 5) * 5 - (playerCurrentY + 5) ===
        5
      ) {
        yDir.current += 1;
      } else if (
        Math.round((ballCurrentY - 5 / 3) / 5) * 5 - (playerCurrentY + 5) !==
        0
      ) {
        setOpponentScore((prev) => prev + 1);
      }
      xDir.current = 1;
    }

    if (ballCurrentY <= 0 || ballCurrentY >= 100 - 10 / 3) {
      yDir.current = -yDir.current;
    }

    ball.current.style.transform = `translate(${
      ballCurrentX + BALL_SPEED_X * xDir.current
    }vw, ${ballCurrentY + BALL_SPEED_Y * yDir.current}vh)`;
  };

  useEffect(() => {
    const pingTimer = setInterval(() => {
      !isPaused && setPing(PING_VALUES[Math.floor(Math.random() * 3)]);
    }, 10000);

    const gameLoop = setInterval(!isPaused && updateBallPosition, 100);
    return () => {
      clearInterval(gameLoop);
      clearTimeout(pingTimer);
    };
  }, [isPaused]);

  useEffect(() => {
    ball.current.style.transition = `unset`;
    ball.current.style.transform = `translate(50vw, 50vh)`;
    setIsPaused(true);
    setTimeout(() => {
      ball.current.style.transition = `all 0.2s ease`;
      setIsPaused(false);
    }, 500);
  }, [playerScore, opponentScore]);

  useEventListener("keydown", handler);

  const pingToText = (ping) => {
    if (PING_VALUES.indexOf(ping) === 0) return "Perfect";
    if (PING_VALUES.indexOf(ping) === 1) return "Average";
    return "Poor";
  };

  return (
    <div className={styles.canvas}>
      <Brick reference={player} />
      <Brick reference={opponent} />
      <Ball reference={ball} />
      <div className={styles.scores}>
        <div>Ping: {pingToText(ping)}</div>
        <div>Player: {playerScore}</div>
        <div>Opponent: {opponentScore}</div>
        <button
          onClick={() => {
            setIsPaused((prev) => !prev);
          }}
        >
          {!isPaused ? "Pause" : "Resume"}
        </button>
      </div>
    </div>
  );
};

export default Canvas;
