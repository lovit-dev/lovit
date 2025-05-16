import LinkButton from '../components/LinkButton';
import { Path } from '../constants';

function NotFound() {
  return (
    <div className='mx-auto mt-24 flex w-64 flex-col items-center gap-y-4 text-center'>
      <title>Lovit | 404</title>
      <span className='text-6xl font-bold text-grey-light'>404</span>
      <h1 className='text-xl font-bold text-grey-light'>PAGE NOT FOUND</h1>
      <span className='h-px w-15 bg-black-light-2'>&nbsp;</span>
      <p>We understand, sometimes things get lost in the digital world. Let's get you back on track.</p>
      <LinkButton to={Path.Home} variant='outlinePrimary'>
        Take me home
      </LinkButton>
    </div>
  );
}

export default NotFound;
