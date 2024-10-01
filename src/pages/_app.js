import "@/styles/globals.css";
import Layout from '@/components/Layout'
import { AuthProvider } from '@/context/AuthContext';

import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {

  return (
    <>
    <NextNProgress />

        <AuthProvider>

        <ThemeProvider >
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        </AuthProvider>
    </>
  )
}