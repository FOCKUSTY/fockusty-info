import type { OrderType } from './types';
import { Api } from './enums/api.enum';

import express from 'express';
import { join } from 'node:path';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

const browserDistFolder = join(import.meta.dirname, '../browser');

export const app = express();
const angularApp = new AngularNodeAppEngine({
  trustProxyHeaders: true
});

app.use(Api.base, express.json())

const MOCK_ORDERS: OrderType[] = [
  {
    name: "Сайт",
    description: "Создание сайта под ключ",
    payment: "$4 за час"
  },
  {
    name: "Игра",
    description: "Создание игры",
    payment: "$10 за час"
  },
  {
    name: "Бот",
    description: "Создание Телеграм бота",
    payment: "$500 за проект"
  },
  {
    name: "Фотосессия",
    description: "Фотосессия на улице или в студии",
    payment: "$3 за час"
  },
];

app.get(Api.orders, async (_, res) => {
  return res.json(MOCK_ORDERS);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

export const reqHandler = createNodeRequestHandler(app);
