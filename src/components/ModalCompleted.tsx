import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ModalCompleted.module.css'

export function ModalCompleted() {
    const {isModalActive, setIsModalActive, level} = useContext(ChallengesContext)

    function handleClose(){
        setIsModalActive(false)
        document.getElementById('topContainer').scrollIntoView({behavior: 'smooth'})
    }
    
    return (
        <>
        { isModalActive ? (
            <div className={styles.modalContainer} >
                <div className={styles.modal}>
                    <div>
                        <img 
                        src="icons/close.svg" 
                        alt="Fechar"
                        onClick={handleClose}
                        />
                    </div>
                    <main>
                        <strong>
                            <p>{level}</p>
                            <img src="icons/levelup.svg" alt=""/>
                        </strong>
                        <h1>Parabéns</h1>
                        <h2>Você alcançou um novo nível</h2>
                    </main>
                    <footer>
                        <button onClick={handleClose} >
                            <span>Compartilhar no Twitter</span>  
                            <img src="icons/twitter.svg" alt="Twitter"/>
                        </button>
                    </footer>
                </div>
            </div>
            ) :
            null 
        }
        </>
    )
}