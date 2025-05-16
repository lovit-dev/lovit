import { MDXProvider } from '@mdx-js/react';
import components from '../../components/mdx';
import Clipboard from '../../components/mdx/Clipboard';
import { GuidePath } from '../../constants';

function MdxContent({ mdxModule }: { mdxModule: typeof import('*.mdx') }) {
  const Content = mdxModule.default;

  return (
    <main>
      <title>{mdxModule.meta.title}</title>
      <Clipboard>
        <MDXProvider components={components}>
          <Content guidePath={GuidePath} />
        </MDXProvider>
      </Clipboard>
    </main>
  );
}

export default MdxContent;
