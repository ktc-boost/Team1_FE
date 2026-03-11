import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = {
    ...loadEnv(mode, process.cwd(), ''),
    ...process.env,
  };

  const hasSentry = env.SENTRY_ORG && env.SENTRY_PROJECT && env.SENTRY_AUTH_TOKEN;

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
        },
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      sourcemap: true,
    },
  };
});
