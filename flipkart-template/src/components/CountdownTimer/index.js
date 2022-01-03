import React, { useRef, useState, useEffect } from "react";
import timer from "../../images/timer_a73398.svg";
import './style.css';

const CountdownTimer = () => {
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date('September 14, 2021 11:00:00').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                //stop our timer
                
                return (clearInterval(interval.current));

            } else {
                return (
                    setTimerDays(days),
                    setTimerHours(hours),
                    setTimerMinutes(minutes),
                    setTimerSeconds(seconds)
                );
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        };
    });

    return (
        <>
            <div className="timer" >
                <img src={timer} alt="logo" style={{ height: '24px', width: '24px',    margin: '0 10px -8px -35px' }} />
                <span>
                    <span>{timerDays} : </span>
                    <span>{timerHours} : </span>
                    <span>{timerMinutes} : </span>
                    <span>{timerSeconds}</span>
                   <span className='time_margin'>Left</span>
                </span>
            </div>
        </>
    );
}

export default CountdownTimer