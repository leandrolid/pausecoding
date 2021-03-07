import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel, level } = useContext(ChallengesContext)

    const percentage = Math.round(currentExperience * 100 / experienceToNextLevel)

    return (
        <header className={styles.experienceBar} >
            <span>0 xp</span>
            <div>
                <div 
                style={{ width: `${percentage}%` }} 
                className={styles.progressBar} />

                <span 
                style={{ left: `${percentage}%` }} 
                className={styles.currentExperience} 
                >{currentExperience === 0 ? null : `${currentExperience} xp` }</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}