import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level, user } = useContext(ChallengesContext)



    return (
        <div className={styles.profile} >
            <img src="avatar.jpg" alt="Pofile picture" />
            <div>
                <strong>{user ? user : 'Anônimo'}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Nível {level}</p>
            </div>
        </div>
    )
}