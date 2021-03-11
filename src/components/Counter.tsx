import { useContext, useEffect, useState } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Counter.module.css'

export function Counter() {

    // const [leftMinuteCustom, setLeftMinuteCustom] = useState(2)

    // function increaseMinute(){
    //     setLeftMinuteCustom(leftMinuteCustom+1)

    //     if (leftMinuteCustom >= 5 ){
    //         setLeftMinuteCustom(0)
    //     }
    // }

    const {
        time,
        totalTime,
        hasFinished,
        isButtonActive,
        startCountdown,
        stopCountdown }
        = useContext(CountdownContext)

    const [counterBarColor, setCounterBarColor] = useState('ce2a45')
    const [percentage, setPercentage] = useState(100);

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRighr] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRighr] = String(seconds).padStart(2, '0').split('')

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