import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profile} >
            <img src="https://github.com/leandrolid.png" alt="Pofile picture" />
            <div>
                <strong>Leandro Liduvino</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1</p>
            </div>
        </div>
    )
}