import '../styles/globals.scss'
import '../styles/index.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@lib/context'
import { Layout, Header } from "@components/UI"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>

  )
}


export default MyApp
