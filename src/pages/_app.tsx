import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
    )
}

export default MyApp

//for package.json "heroku-postbuild": "npm run build"
