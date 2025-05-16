import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const mdxOptions: Parameters<typeof mdx>[0] = {
  providerImportSource: '@mdx-js/react',
  remarkPlugins: [remarkMdx, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'meta' }], remarkGfm],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: 'one-dark-pro',
        keepBackground: false
      }
    ]
  ]
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [{ enforce: 'pre', ...mdx(mdxOptions) }, tsconfigPaths(), react(), tailwindcss()]
});
