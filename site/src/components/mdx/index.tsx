import { MDXComponents } from 'mdx/types';
import Callout from './Callout';
import DocLink from './DocLink';
import Heading from './Heading';
import PackageManagerTabs from './PackageManagerTabs';
import UnorderedList from './UnorderedList';

const components: MDXComponents = {
  h1: (props) => <Heading as='h1' {...props} />,
  h2: (props) => <Heading as='h2' {...props} />,
  h3: (props) => <Heading as='h3' {...props} />,
  ul: (props) => <UnorderedList {...props} />,
  a: (props) => <DocLink {...props} />,
  p: (props) => <p {...props} className='my-4 leading-7' />,
  Callout: (props) => <Callout {...props} />,
  pre: (props) => <PackageManagerTabs {...props} />
};

export default components;
