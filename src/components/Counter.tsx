import { useEffect, useState } from 'react'
import styles from '../styles/components/Counter.module.css'

export function Counter() {
    const [time, setTime] = useState(0.05 * 60);
    const [buttonActive, setButtonActive] = useState(false);

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRighr] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRighr] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setButtonActive(true)
    }

    useEffect(() => {
        if (buttonActive && time > 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
            console.log(time)
        }
    }, [buttonActive, time])

    return (
        <div className={styles.counterContainer} >
            <div className={styles.counter} >
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRighr}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRighr}</span>
                </div>
            </div>

            <button
                className={styles.startCounter}
                onClick={startCountdown}
            >Iniciar novo ciclo</button>
        </div>
    )
}