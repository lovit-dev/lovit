import { useState } from 'react';
import GradientText from '../../components/GradientText';
import Heading from '../../components/Heading';
import LinkButton from '../../components/LinkButton';
import { GuidePath, SocialLinks } from '../../constants';
import { cn } from '../../utils/cn';
import logo from '/brand/logo-large.png';

function Hero() {
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <section className='mt-12 mb-16 flex flex-col-reverse items-center justify-between gap-y-2 lg:mt-20 lg:flex-row lg:pr-24'>
      <div className='flex max-w-[30rem] flex-col items-center gap-5 text-center sm:w-[35rem] lg:items-start lg:text-start'>
        <Heading>
          <GradientText>Lovit</GradientText>
          <span className='block'>Next Generation Error Handling</span>
        </Heading>
        <p className='text-lg'>
          Say goodbye to try-catch 👋. Manage and handle asynchronous errors in a more organized, cleaner, and easier
          way.
        </p>
        <div className='flex flex-wrap items-center justify-center gap-3.5'>
          <LinkButton to={`${GuidePath.Base}/${GuidePath.GettingStarted}`}>Get Started</LinkButton>
          <LinkButton to={`${GuidePath.Base}/${GuidePath.WhyLovit}`} variant='secondary'>
            Why Lovit
          </LinkButton>
          <LinkButton to={SocialLinks.Github} variant='secondary' target='_blank'>
            View on Github
          </LinkButton>
        </div>
      </div>
      <div className='relative flex items-center justify-center lg:-mt-16'>
        <div
          className={cn(
            'absolute -z-10 size-40 rounded-full bg-transparent opacity-0 shadow-[0px_0px_70px_5px] shadow-primary transition-opacity duration-250 md:size-52 lg:size-64',
            {
              'opacity-100': logoLoaded
            }
          )}
        >
          &nbsp;
        </div>
        <img src={logo} alt='Lovit Logo' className='size-52 md:size-64 lg:size-80' onLoad={() => setLogoLoaded(true)} />
      </div>
    </section>
  );
}

export default Hero;
