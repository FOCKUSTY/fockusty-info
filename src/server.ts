import { HttpStatusCode } from '@angular/common/http';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import { join } from 'node:path';
import { OrderType } from './types';

const browserDistFolder = join(import.meta.dirname, '../browser');

export const app = express();
const angularApp = new AngularNodeAppEngine();

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

app.get("/api/orders", async (_, res) => {
  const promise = new Promise<OrderType[]>((res) => {
    setTimeout(() => res(MOCK_ORDERS), 50); /* эмуляция фетчинга */
  });

  promise
    .then((orders) => res.send(orders))
    .catch(() => res.sendStatus(HttpStatusCode.InternalServerError));
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

export const requestHandler = createNodeRequestHandler(app);
