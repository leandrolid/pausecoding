import Head from 'next/head'
import { ExperienceBar } from '../components/ExperienceBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>pausecoding</title>
        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
      </Head>

      <div className="container" >
        <ExperienceBar/>
      </div>

    </div>
  )
}