import GradientText from '../../components/GradientText';
import Heading from '../../components/Heading';
import LinkButton from '../../components/LinkButton';
import { GuidePath } from '../../constants';
import glowButton from '/home/glow-button.png';

function Start() {
  return (
    <section className='clip-diagonal relative mt-32 flex h-95 flex-col items-center gap-y-7 bg-black-light px-2 pt-16 text-center'>
      <Heading as='h2'>
        Start building with <GradientText>Lovit</GradientText>
      </Heading>
      <div className='relative flex items-center'>
        <LinkButton to={`${GuidePath.Base}/${GuidePath.GettingStarted}`}>Get Started</LinkButton>
        <img className='absolute -left-7 -z-99 max-w-44' src={glowButton} alt='layer blur' />
      </div>
    </section>
  );
}

export default Start;
