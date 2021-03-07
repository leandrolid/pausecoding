import { ChallengesProvider } from '../contexts/ChallengeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
    )
}

export default MyApp

//for package.json "heroku-postbuild": "npm run build"
