import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Counter } from '../components/Counter'
import { ChallengeBox } from '../components/ChallengeBox'
import { ModalCompleted } from '../components/ModalCompleted'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengeContext'

interface PropsData {
  level: number,
  currentExperience: number,
  completedChallenges: number
}

export default function Home(props: PropsData) {

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
      completedChallenges: Number(completedChallenges)
    }
  }
}