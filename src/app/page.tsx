import Image from 'next/image'
import { Footer, Hero, Header, Projects } from '../components'
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
