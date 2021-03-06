import { useEffect, useState } from 'react'
import styles from '../styles/components/Counter.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Counter() {
    const totalTime = 0.2 * 60

    const [time, setTime] = useState(totalTime);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)
    const [counterBarColor, setCounterBarColor] = useState('ce2a45')
    const [percentage, setPercentage] = useState(100);


    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRighr] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRighr] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setIsButtonActive(true)
    }
    useEffect(() => {
        if (isButtonActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)

            }, 1000)
        } else if (isButtonActive && time === 0) {
            setHasFinished(true)
            setIsButtonActive(false)
            //setTime(totalTime)
        }
    }, [isButtonActive, time])

    function stopCountdown() {
        clearTimeout(countdownTimeout)
        setIsButtonActive(false)
        setTime(totalTime)
    }

    useEffect(() => {
        setPercentage(Math.ceil(100 / totalTime * time))
    }, [time])

    useEffect(() => {
        if (percentage < 67 && percentage > 33) {
            setCounterBarColor('e6d31a')
        } else if (percentage < 34) {
            setCounterBarColor('4cd62b')
        }
    }, [percentage])


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

            {hasFinished ? (
                <button
                    disabled
                    className={styles.startCounter}
                >Ciclo encerrado
                    <img src="icons/check.svg" />
                </button>
            ) :
                (
                    <>
                        {!isButtonActive ?
                            (
                                <button
                                    type="button"

                                    className={styles.startCounter}
                                    onClick={startCountdown}
                                >Iniciar novo ciclo
                                </button>
                            )
                            :
                            (
                                <>
                                    <button
                                        type="button"

                                        className={`${styles.startCounter} ${styles.stopCounter} `}
                                        onClick={stopCountdown}
                                    >Abandonar ciclo
                                        <div className={styles.countownBarContainer}>
                                            <div
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: `#${counterBarColor}`
                                                    //'#ce2a45'
                                                }}
                                                className={styles.countownBar} />
                                        </div>
                                    </button>
                                </>
                            )
                        }
                    </>
                )
            }



        </div>
    )
}