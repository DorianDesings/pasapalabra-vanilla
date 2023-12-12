import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig({
  plugins: [ViteMinifyPlugin({}), ViteImageOptimizer({})],
  base: '',
  root: 'src',
  build: {
    outDir: '../docs'
  }
});
