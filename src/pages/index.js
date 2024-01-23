import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
    <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Welcome to my Next.js application" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
        <h1 className={styles.title}>
            Welcome to My Next.js App!
        </h1>
        <p className={styles.description}>
            Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        {/* Add more content here as needed */}
    </main>

    <footer className={styles.footer}>
        {/* Footer content */}
    </footer>
</div>
  )
}
