import { createApp, h, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const app = createApp(TheTopProgressBar);

  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const progressInstance = app.mount(container ?? addDefaultContainer());

  const progress = {
    start: progressInstance.start,
    finish: progressInstance.finish,
    fail: progressInstance.fail,
    install(app) {
      app.provide(PROGRESS_KEY, progress);
    },
  };

  if (router) {
    router.beforeEach((to, from, next) => {
      progress.start();
      next();
    });

    router.afterEach(() => {
      progress.finish();
    });

    router.onError(() => {
      progress.fail();
    });
  }

  return progress;
}
