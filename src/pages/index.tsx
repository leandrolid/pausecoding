import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ChallengesProvider } from '../contexts/ChallengeContext'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
// import { ModalCompleted } from '../components/ModalCompleted'
// import { ExperienceBar } from '../components/ExperienceBar'
// import { Profile } from '../components/Profile'
// import { CompletedChallenges } from '../components/CompletedChallenges'
// import { Counter } from '../components/Counter'
// import { ChallengeBox } from '../components/ChallengeBox'
// import { CountdownProvider } from '../contexts/CountdownContext'

import { useRouter } from 'next/router'

import styles from '../styles/components/Session.module.css'

interface PropsData {
  level: number,
  currentExperience: number,
  completedChallenges: number,
}

export default function Home(props: PropsData,) {

  const [isSignUpActive, setIsSignUpActive] = useState(false)
  const [username, setUsername] = useState("")
  const [buttonCollor, setButtonCollor] = useState("4953b8")

  // console.log(username)
  //localStorage.setItem('user', username)

  const router = useRouter()

  useEffect(() => {
    if (username) {
      setButtonCollor("4CD62B")
      Cookies.set("username", username)

      const user = Cookies.get("username")
      console.log(user)
    }
  }, [username])


  function handleLogin(event) {
    event.preventDefault()
    // typically you want to use `next/link` for this usecase
    // but this example shows how you can also access the router
    // and use it manually
    router.push('/challenges')
  }

  function handleSignUp() {
    setIsSignUpActive(true)
  }
  function handleSignIn() {
    setIsSignUpActive(false)
  }

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      completedChallenges={props.completedChallenges}
    >
      <Head>
        <title>pausecoding</title>
      </Head>

      { !isSignUpActive ? (
        <main className={styles.loginContainer} >
          <form
            method="post"
            className={styles.loginForm}
            onSubmit={handleLogin}
          >
            <header>
              <img src="logo-01.svg" alt="pausecoding" />
            </header>
            <label>Bem-vindo(a)</label>
            <p>Faça login para receber seus desafios</p>
            <div>
              <input
                type="text"
                name="username"
                id="username"
                required
                autoFocus
                placeholder="Digite seu username"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />

              <button
                type="submit"
                style={{ background: `#${buttonCollor}` }}

              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.17939e-07 13.5L18.255 13.5L9.87 21.885L12 24L24 12L12 -1.04907e-06L9.885 2.115L18.255 10.5L1.18021e-06 10.5L9.17939e-07 13.5Z" fill="white" />
                </svg>
              </button>

            </div>
            <span onClick={handleSignUp} >Não possuo cadastro</span>
          </form>
        </main>
      ) : (
        <main className={styles.loginContainer} >
          <form
            method="get"
            className={styles.loginForm}
            onSubmit={handleLogin}
          >
            <header>
              <img src="logo-01.svg" alt="pausecoding" />
            </header>
            <label>Bem-vindo(a)</label>
            <p>Faça login para receber seus desafios</p>
            <div id={styles.signUpUsername}>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Digite seu username"

              />
            </div>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Digite seu nome"

              />
              <button
                type="submit"
                style={{ background: `#${buttonCollor}` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.17939e-07 13.5L18.255 13.5L9.87 21.885L12 24L24 12L12 -1.04907e-06L9.885 2.115L18.255 10.5L1.18021e-06 10.5L9.17939e-07 13.5Z" fill="white" />
                </svg>
              </button>
            </div>
            <span onClick={handleSignIn} >Já possuo cadastro</span>
          </form>
        </main>
      )}


    </ChallengesProvider>
  )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {



  const { level, currentExperience, completedChallenges } = ctx.req.cookies


  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallenges: Number(completedChallenges),
    }

  }
}