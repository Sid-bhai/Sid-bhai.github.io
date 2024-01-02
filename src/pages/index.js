import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Hero, Header, Footer, Projects } from '../components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header />
      <br />   <br />   <br />   <br />
      <Hero />
      <Projects />
      <Footer />
    </>
  );
}
