import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    let experience = 40
    return (
        <header className={styles.experienceBar} >
            <span>0 xp</span>
            <div>
                <div style={{ width: `${experience}%` }} className={styles.progressBar} />
                <span style={{ left: `${experience}%` }} className={styles.currentExperience} >{experience * 6} xp</span>
            </div>
            <span>600 xp</span>
        </header>
    )
}