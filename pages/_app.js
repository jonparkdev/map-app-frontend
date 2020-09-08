import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { useStore } from '../redux/store'
import { getUser } from '../redux/actions'

// Normalize global styles
import '../css/normalize.css'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  useEffect(() => {
    const loadUser = async () => {
      await store.dispatch(getUser())
    }
    // Retrieve user on every page load
    loadUser()
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            font-family: 'Roboto', sans-serif;
          }
        `}
      </style>
    </Provider>
  )
}
