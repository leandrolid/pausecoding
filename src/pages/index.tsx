import Head from 'next/head'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Counter } from '../components/Counter'


export default function Home() {
  return (
    <>
      <Head>
        <title>pausecoding</title>
      </Head>
      <div className="container" >
        <ExperienceBar />

        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Counter />
          </div>

          <div>
            Direita
        </div>
        </section>
      </div>
    </>
  )
}