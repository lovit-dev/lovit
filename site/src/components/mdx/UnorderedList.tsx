import { ReactNode } from 'react';

function UnorderedList({ children }: { children: ReactNode }) {
  return <ul className='my-4 list-inside list-disc space-y-1.5 text-grey'>{children}</ul>;
}

export default UnorderedList;
