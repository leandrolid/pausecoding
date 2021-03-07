import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    
    const {currentChallenge, resetChallenge , completeChallenge} = useContext(ChallengesContext)
    const {stopCountdown } = useContext(CountdownContext)

    function handleChallengeFailed(){
        resetChallenge()
        stopCountdown()
    }

    function handleChallengeSucceeded(){
        resetChallenge()
        stopCountdown()
        completeChallenge()
    }

    return (
        <div className={styles.challengeBoxContainer} >
            {!currentChallenge ? 
            (
                <div className={styles.challengeNotActive} >
                <div> 
                    <strong>Inicie um ciclo <br/> para receber desafios</strong>
                </div>
                <div>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando <br/> os desafios
                </div>
            </div>
            ) : 
            (
                <div className={styles.challengeActive} >
                    <header>Ganhe {currentChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${currentChallenge.type}.svg` }alt="Level Up"/>
                        <strong>Exercite-se</strong>
                        <p>{currentChallenge.description} </p>
                    </main>
                    <footer>
                        <button 
                        type="button"
                        className={styles.buttonFailed}
                        onClick={handleChallengeFailed}
                        >Falhei</button>

                        <button 
                        type="button" 
                        className={styles.buttonSucceeded}
                        onClick={handleChallengeSucceeded}
                        >Completei</button>
                    </footer>
            </div>
            )}
        </div>
    )
}