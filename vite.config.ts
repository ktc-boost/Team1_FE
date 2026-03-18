import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { defineConfig, loadEnv } from 'vite';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = {
    ...loadEnv(mode, process.cwd(), ''),
    ...process.env,
  };

  const hasSentry = !!env.SENTRY_ORG && !!env.SENTRY_PROJECT && !!env.SENTRY_AUTH_TOKEN;

  return {
    plugins: [
      react({
        exclude: ['src/components/shadcn/**/*.{ts,tsx,js,jsx}'],
      }),
      tailwindcss(),

      ...(hasSentry
        ? [
            sentryVitePlugin({
              org: env.SENTRY_ORG,
              project: env.SENTRY_PROJECT,
              authToken: env.SENTRY_AUTH_TOKEN,
              release: {
                name: env.VITE_SENTRY_RELEASE || env.GITHUB_SHA || env.VITE_RELEASE || 'local-dev',
                deploy: {
                  env: env.SENTRY_ENVIRONMENT || mode,
                },
              },
            }),
          ]
        : []),
    ],

    server: {
      proxy: {
        '/api': {
          target: 'https://api.boost.ai.kr',
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(dirname, './src'),
      },
    },

    build: {
      sourcemap: true,
    },

    test: {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  };
});
