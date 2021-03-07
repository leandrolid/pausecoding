import { createContext, ReactNode, useEffect, useState } from 'react'
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
    completedChallenges:number,
    isModalActive:boolean,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    setCurrentExperience: (argument) => void,
    setIsModalActive: (argument) => void,

}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}: ChallengesProviderProps){
    const [level, setLevel] = useState(0)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [currentChallenge, setCurrentChallenge ] = useState(null)
    const [completedChallenges, setCompletedChallenges ] = useState(0)
    const [isModalActive, setIsModalActive ] = useState(false)

    function levelUp(){
        setLevel( level + 1 )
    }

    function startNewChallenge(){
        const newRandomIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[newRandomIndex]
        setCurrentChallenge(challenge)
    }

    function resetChallenge(){
        setCurrentChallenge(null)
    }

    function completeChallenge(){
        if (!currentChallenge){
            return;
        } else {
            const {amount} = currentChallenge
            let finalExperience = currentExperience + amount
            if (finalExperience >= experienceToNextLevel){
                
                finalExperience = finalExperience - experienceToNextLevel
                levelUp()
            }
            
            setCurrentExperience(finalExperience)
            setCurrentChallenge(null)
            setCompletedChallenges( completedChallenges + 1 )
        }
    }

    const experienceToNextLevel = Math.pow( (level+1 ) * 4, 2)

    
    useEffect(()=>{
        //setIsModalActive(true)
    }, [ ])
    

    return (
    <ChallengesContext.Provider value={{
        level, 
        currentExperience,
        currentChallenge, 
        experienceToNextLevel,
        completedChallenges,
        isModalActive,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        setCurrentExperience,
        setIsModalActive
        }} >
        {children}
    </ChallengesContext.Provider>
    )
}