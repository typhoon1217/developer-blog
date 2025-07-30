import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';

const config = defineConfig({
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [
    remarkGfm,
    remarkUnwrapImages
  ],
  rehypePlugins: [
    rehypeSlug
  ]
});

export default config;