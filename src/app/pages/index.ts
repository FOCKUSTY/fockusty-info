import type { Routes } from '@angular/router';

import { HomeRoute } from './home';
import { NotFoundRoute } from './404';

export const PAGES_ROUTES: Routes = [HomeRoute, NotFoundRoute];
