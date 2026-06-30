import type { Routes } from '@angular/router';

import { HomeRoute } from './home';
import { OrderRoute } from './order';
import { ResumeRoute } from './resume';

// import { NotFoundRoute } from './404';

export const PAGES_ROUTES: Routes = [HomeRoute, OrderRoute, ResumeRoute /* NotFoundRoute */];
