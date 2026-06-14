import { App } from '#app.js';

const port = process.env.PORT ?? '8000';
const application = new App();

await application.init();

application.app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
