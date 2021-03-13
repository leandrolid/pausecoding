import Cookies from 'js-cookie';
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
    increaseMinuteLeft: () => void,
    reduceMinuteLeft: () => void,
    increaseMinuteRight: () => void,
    reduceMinuteRight: () => void,
    increaseSecondLeft: () => void,
    reduceSecondLeft:() => void,
    increaseSecondRight: () => void,
    reduceSecondRight: () => void,
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext)

    
    const [minuteLeftCustom, setMinuteLeftCustom] = useState(2)
    const [minuteRightCustom, setMinuteRightCustom] = useState(5)
    const [secondLeftCustom, setSecondLeftCustom] = useState(0)
    const [secondRightCustom, setSecondRightCustom] = useState(0)
    useEffect( ()=>{
        Cookies.set('minuteLeftCustom', String(minuteLeftCustom) )
        Cookies.set('minuteRightCustom', String(minuteRightCustom) )
        Cookies.set('secondLeftCustom', String(secondLeftCustom) )
        Cookies.set('secondRightCustom', String(secondRightCustom) )
    
    } ,[minuteLeftCustom, minuteRightCustom, secondLeftCustom, secondRightCustom])


    function increaseMinuteLeft() {
        setMinuteLeftCustom(minuteLeftCustom + 1)
        
        if (minuteLeftCustom >= 5) {
            setMinuteLeftCustom(0)
        }
        
    }
    function reduceMinuteLeft() {
        setMinuteLeftCustom(minuteLeftCustom - 1)
        
        if (minuteLeftCustom <= 0) {
            setMinuteLeftCustom(5)
        }
    }
    /////////////////////////////
    function increaseMinuteRight() {
        setMinuteRightCustom(minuteRightCustom + 1)
        
        if (minuteRightCustom >= 9) {
            setMinuteRightCustom(0)
        }
    }
    function reduceMinuteRight() {
        setMinuteRightCustom(minuteRightCustom - 1)
        
        if (minuteRightCustom <= 0) {
            setMinuteRightCustom(9)
        }
    }
    ///////////////////////////////////////
    function increaseSecondLeft() {
        setSecondLeftCustom(secondLeftCustom + 1)
        
        if (secondLeftCustom >= 5) {
            setSecondLeftCustom(0)
        }
    }
    function reduceSecondLeft() {
        setSecondLeftCustom(secondLeftCustom - 1)
        
        if (secondLeftCustom <= 0) {
            setSecondLeftCustom(5)
        }
    }
    //////////////////////////////////////////////
    function increaseSecondRight() {
        setSecondRightCustom(secondRightCustom + 1)
        
        if (secondRightCustom >= 9) {
            setSecondRightCustom(0)
        }
    }
    function reduceSecondRight() {
        setSecondRightCustom(secondRightCustom - 1)
        
        if (secondRightCustom <= 0) {
            setSecondRightCustom(9)
        }
    }

    const [totalTime, setTotalTime] = useState(25*60)

    useEffect(()=>{
        const minLeft = Cookies.get('minuteLeftCustom')
        const minRight = Cookies.get('minuteRightCustom')
        const secLeft = Cookies.get('secondLeftCustom')
        const secRight = Cookies.get('secondRightCustom')

        let totMinutes = minLeft+minRight
        let totSeconds = secLeft+secRight

        setTotalTime(Number(totMinutes)*60+Number(totSeconds))

    }, [minuteLeftCustom, minuteRightCustom, secondLeftCustom, secondRightCustom])



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
            stopCountdown,
            increaseMinuteLeft,
            reduceMinuteLeft,
            increaseMinuteRight,
            reduceMinuteRight,
            increaseSecondLeft,
            reduceSecondLeft,
            increaseSecondRight,
            reduceSecondRight,
        }} >
            {children}
        </CountdownContext.Provider>
    )
}