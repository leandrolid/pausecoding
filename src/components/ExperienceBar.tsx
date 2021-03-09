import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {

    const [currentExperienceBG, setCurrentExperienceBG] = useState('block')

    const [percentage, setPercentage] = useState(0)

    const { currentExperience, experienceToNextLevel, setCurrentExperience } = useContext(ChallengesContext)

    useEffect(() => {
        if (currentExperience >= experienceToNextLevel) {
            let diferencePercentage = currentExperience - experienceToNextLevel
            setCurrentExperience(diferencePercentage)
        }
        setPercentage(Math.round(currentExperience * 100 / experienceToNextLevel))
    }, [currentExperience])

    useEffect(() => {
        if (currentExperience == 0) {
            setCurrentExperienceBG('none')
        } else {
            setCurrentExperienceBG('block')
        }
    }, [currentExperience])


    return (
        <header id='experienceBar' className={styles.experienceBar} >
            <span>0 xp</span>
            <div>
                <div
                    style={{ width: `${percentage}%`, transition: '0.5s' }}
                    className={styles.progressBar} />

                <span
                    style={{ left: `${percentage}%`, transition: '0.5s', display: `${currentExperienceBG}` }}
                    className={styles.currentExperience}
                >{currentExperience === 0 ? null : `${currentExperience} xp`}
                    <div />
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}