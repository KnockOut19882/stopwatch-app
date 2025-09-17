import React, { useState, useRef, useEffect } from 'react';
import styles from './Stopwatch.module.scss';

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className={styles.stopwatchContainer}>
      <h1 className={styles.title}>Stoper</h1>
      <div className={styles.time}>{formatTime(time)}</div>
      <div className={styles.buttons}>
        <button onClick={start} disabled={running} className={styles.button}>Start</button>
        <button onClick={stop} disabled={!running} className={styles.button}>Stop</button>
        <button onClick={reset} className={styles.button}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
