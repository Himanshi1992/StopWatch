import React, { useState, useEffect, useRef } from "react";

function Stopwatch(){
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if(isRunning){
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }
        else{
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(prev => !prev);
    };
    const handleReset = () => {
        setIsRunning(false);
        setSeconds(0);
    };
    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    return (
        <div>
            <h1>Stopwatch</h1>
            <p>Time: {formatTime(seconds)}</p>
            <div>
                <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
}
export default Stopwatch;