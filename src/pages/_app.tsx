import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout, Header } from "@components/UI"
const MyApp = ({ Component, pageProps }: AppProps) =>
  <>
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  </>


export default MyApp
