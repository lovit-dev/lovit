import Footer from '../../components/Footer';
import Features from './Features';
import Hero from './Hero';
import Start from './Start';

function Home() {
  return (
    <>
      <main className='mx-auto max-w-7xl px-12'>
        <Hero />
        <Features />
        <Start />
      </main>
      <Footer />
    </>
  );
}

export default Home;
