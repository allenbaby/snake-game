import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [snake, setSnake] = useState([{ x: 200, y: 200 }, { x: 210, y: 200 }, { x: 220, y: 200 }]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({ x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let newSnake = [...snake];
      let head = { ...newSnake[0] };

      if (direction === 'UP') head.y -= 10;
      if (direction === 'DOWN') head.y += 10;
      if (direction === 'LEFT') head.x -= 10;
      if (direction === 'RIGHT') head.x += 10;

      newSnake.unshift(head);

      if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
        setFood({ x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 });
        setScore(score + 1);
      } else {
        newSnake.pop();
      }

      if (
        newSnake[0].x < 0 ||
        newSnake[0].x > 400 ||
        newSnake[0].y < 0 ||
        newSnake[0].y > 400 ||
        newSnake.slice(1).some((segment) => segment.x === newSnake[0].x && segment.y === newSnake[0].y)
      ) {
        setGameOver(true);
      }

      setSnake(newSnake);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [snake, direction, food, score]);

  return (
    <div className="game-container">
      <div className="game-board">
        {snake.map((segment, index) => (
          <div key={index} className="snake-segment" style={{ left: segment.x, top: segment.y }}></div>
        ))}
        <div className="food" style={{ left: food.x, top: food.y }}></div>
      </div>
      <div className="game-info">
        <p>Score: {score}</p>
        {gameOver && <p>Game Over!</p>}
      </div>
    </div>
  );
};

export default App;