import Head from 'next/head'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Counter } from '../components/Counter'
import { ChallengeBox } from '../components/ChallengeBox'
import { ModalCompleted } from '../components/ModalCompleted'
import { CountdownProvider } from '../contexts/CountdownContext'


export default function Home() {
  return (
    <>
      <Head>
        <title>pausecoding</title>
      </Head>
      <div className="container" >
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
    </>
  )
}