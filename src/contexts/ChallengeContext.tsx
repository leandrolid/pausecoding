import { createContext, ReactNode, useState } from 'react'
import challenges from '../../challenges.json'

interface ChallengesProviderProps {
    children: ReactNode
}
interface Challenge {
    type: string,
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number, 
    currentExperience: number,
    currentChallenge:Challenge,
    experienceToNextLevel:number,
    startNewChallenge: () => void,
    resetChallenge: () => void,

}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}: ChallengesProviderProps){
    const [level, setLevel] = useState(0)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [currentChallenge, setCurrentChallenge ] = useState(null)

    function startNewChallenge(){
        const newRandomIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[newRandomIndex]
        setCurrentChallenge(challenge)
    }

    function resetChallenge(){
        setCurrentChallenge(null)
    }

    const experienceToNextLevel = Math.pow( (level+1 ) * 4, 2)

    return (
    <ChallengesContext.Provider value={{
        level, 
        currentExperience,
        currentChallenge, 
        experienceToNextLevel,
        startNewChallenge,
        resetChallenge
        }} >
        {children}
    </ChallengesContext.Provider>
    )
}