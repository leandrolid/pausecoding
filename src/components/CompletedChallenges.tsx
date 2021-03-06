import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
    return (
        <div className={styles.completed} >
            <span>
                Desafios completados
            </span>
            <span className={styles.completedNumber} >
                00
            </span>
        </div>
    )
}