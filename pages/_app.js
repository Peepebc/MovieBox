import '@/styles/globals.css'
import { CookiesProvider } from "react-cookie"
import Context from './Context.js'
import { useState } from 'react'
import Navigation from './components/Navigation.jsx'
import Layout from './components/Layout.jsx';
export default function App({ Component, pageProps }) {

  const [user,setUser] = useState(null)

  const renderWithLayout = Component.getLayout ||
  function (page) {
    return (
    <Context.Provider value={{user, setUser}}>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </Context.Provider>)
  }

  return renderWithLayout(<Component {...pageProps}/>)
 
}
