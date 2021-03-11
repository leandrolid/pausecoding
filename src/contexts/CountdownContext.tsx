import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengeContext';

interface CountdownProviderProps {
    children: ReactNode
}

interface CountdownContextData {
    time: number,
    totalTime: number,
    hasFinished: boolean,
    isButtonActive: boolean,
    startCountdown: () => void,
    stopCountdown: () => void,
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext)

    

    const totalTime = 0.05 * 60

    const [time, setTime] = useState(totalTime);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)

    async function startCountdown() {
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
            startNewChallenge()
            document.getElementById('challengeBox').scrollIntoView({ behavior: 'smooth', block: 'end' })
            //setTime(5*60)
            //setIsButtonActive(true)
        }
    }, [isButtonActive, time])

    function stopCountdown() {
        clearTimeout(countdownTimeout)
        setIsButtonActive(false)
        setTime(totalTime)
        setHasFinished(false)
    }

    return (
        <CountdownContext.Provider value={{
            time,
            totalTime,
            hasFinished,
            isButtonActive,
            startCountdown,
            stopCountdown
        }} >
            {children}
        </CountdownContext.Provider>
    )
}