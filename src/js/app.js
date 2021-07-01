import News from './news';

const news = new News('.news-container', 'https://ahj-workers-back.herokuapp.com/data');
news.init();

(async () => {
  try {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register(
        './service-worker.js',
      );
    }
  } catch (e) {
    console.log(e);
  }
})();
