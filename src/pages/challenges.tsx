import Head from 'next/head'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Counter } from '../components/Counter'
import { ChallengeBox } from '../components/ChallengeBox'
import { ModalCompleted } from '../components/ModalCompleted'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengeContext'
import { GetServerSideProps } from 'next'
// import { useEffect, useState } from 'react'

// import styles from '../styles/components/Session.module.css'
// import Cookies from 'js-cookie'

interface PropsData {
  level: number,
  currentExperience: number,
  completedChallenges: number,
}

export default function Challenges(props: PropsData) {

  // const [isLoginActive, setIsLoginActive] = useState(false)
  // const [isSignUpActive, setIsSignUpActive] = useState(false)
  // const [username, setUsername] = useState("")
  // const [buttonCollor, setButtonCollor] = useState("4953b8")

  // //console.log(username)
  // //localStorage.setItem('user', username)
  // useEffect(() => {
  //   if (username) {
  //     setButtonCollor("4CD62B")
  //   }
  // }, [username])
  // function handleLogin(event) {
  //   event.preventdefault
  //   Cookies.set("username", username)
  //   setIsLoginActive(true)
  // }

  // function handleSignUp() {
  //   setIsSignUpActive(true)
  // }
  // function handleSignIn() {
  //   setIsSignUpActive(false)
  // }



  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      completedChallenges={props.completedChallenges}
    >
      <Head>
        <title>pausecoding</title>
      </Head>

      <div id='topContainer' className="container" >
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Counter />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>

      <ModalCompleted />
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