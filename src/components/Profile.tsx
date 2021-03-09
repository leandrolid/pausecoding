import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profile} >
            <img src="https://github.com/leandrolid.png" alt="Pofile picture" />
            <div>
                <strong>Leandro Liduvino</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Nível {level}</p>
            </div>
        </div>
    )
}