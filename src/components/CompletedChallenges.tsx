import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
    const {completedChallenges} = useContext(ChallengesContext)
    let completedAmount = String(completedChallenges).padStart(2, '0')
    return (
        <div className={styles.completed} >
            <span>
                Desafios completados
            </span>
            <span className={styles.completedNumber} >
                {completedAmount}
            </span>
        </div>
    )
}