import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Counter.module.css'

export function Counter() {
       
    
    const {
        time,
        totalTime,
        hasFinished,
        isButtonActive,
        startCountdown,
        stopCountdown,
//         increaseMinuteLeft,
//         reduceMinuteLeft,
//         increaseMinuteRight,
//         reduceMinuteRight,
//         increaseSecondLeft,
//         reduceSecondLeft,
//         increaseSecondRight,
//         reduceSecondRight
     }
        = useContext(CountdownContext)
        
    const [counterBarColor, setCounterBarColor] = useState('ce2a45')
    const [percentage, setPercentage] = useState(100)
    
    
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('')
    
    useEffect(() => {
            setPercentage(Math.ceil(100 / totalTime * time))        
    }, [time, totalTime])

    useEffect(() => {

            // setMinuteLeft(minLeft)
            // setMinuteRight(minRight)
            // setSecondLeft(secLeft)
            // setSecondRight(secRight)


    }, [totalTime])


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
                    <span>
                        
                        {minuteLeft}
                        
                    </span>
                    <span>
                        
                        {minuteRight}
                        
                    </span>
                </div>
                <span>:</span>
                <div>
                    <span>
                       
                        {secondLeft}
                        
                    </span>
                    <span>
                        
                        {secondRight}
                        
                    </span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={styles.startCounter}
                >Ciclo encerrado
                    <img src="icons/check.svg" />
                    <div className={styles.countownBarContainer}>
                        <div
                            style={{
                                width: `${100 - percentage}%`,
                                backgroundColor: `#${counterBarColor}`
                                //'#ce2a45'
                            }}
                            className={styles.countownBar} />
                    </div>
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
                                                    width: `${100 - percentage}%`,
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
