import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            onTimeout();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime, onTimeout]);

  const formatTime = () => {
    const days = Math.floor(remainingTime / (24 * 60 * 60));
    const hours = Math.floor((remainingTime % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return <span>{formatTime()}</span>;
};

export default CountdownTimer;