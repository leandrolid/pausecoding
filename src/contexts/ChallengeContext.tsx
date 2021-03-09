import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'

interface ChallengesProviderProps {
    children: ReactNode
    level: number,
    currentExperience: number,
    completedChallenges: number,
}
interface Challenge {
    type: string,
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number,
    currentExperience: number,
    currentChallenge: Challenge,
    experienceToNextLevel: number,
    completedChallenges: number,
    isModalActive: boolean,
    user: string,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    setCurrentExperience: (argument) => void,
    setIsModalActive: (argument) => void,

}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    const user = null
    /*
    
    async function createUser() {
        const response = await axios.post('/api/createusers', { username: 'leandro.asl' })
        //console.log(response)

        const { user } = response.data

        Cookies.set('user', user.username)

        //console.log(user)
    }

    useEffect(() => {
        createUser()
    }, [user])
    */

    const [level, setLevel] = useState(rest.level ?? 0)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [currentChallenge, setCurrentChallenge] = useState(null)
    const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0)

    const [isModalActive, setIsModalActive] = useState(false)

    function levelUp() {
        setLevel(level + 1)
    }

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('completedChallenges', String(completedChallenges))
    }, [level, currentExperience, completedChallenges])

    function startNewChallenge() {
        const newRandomIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[newRandomIndex]
        setCurrentChallenge(challenge)

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount} xp`
            })
        }

        new Audio('/notification.mp3').play()
    }

    function resetChallenge() {
        setCurrentChallenge(null)
    }

    function completeChallenge() {
        if (!currentChallenge) {
            return;
        } else {
            const { amount } = currentChallenge
            let finalExperience = currentExperience + amount
            if (finalExperience >= experienceToNextLevel) {

                finalExperience = finalExperience - experienceToNextLevel
                levelUp()
                setIsModalActive(true)
                //document.getElementById('topContainer').classList.add('freeze-container')
                //const teste = document.getElementById('topContainer').classList
                //console.log(teste)

            }

            setCurrentExperience(finalExperience)
            setCurrentChallenge(null)
            setCompletedChallenges(completedChallenges + 1)
        }
    }

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            currentChallenge,
            experienceToNextLevel,
            completedChallenges,
            isModalActive,
            user,
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