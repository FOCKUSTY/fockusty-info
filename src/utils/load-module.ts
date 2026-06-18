import type { Type } from '@angular/core';
import type { Route } from '@angular/router';

export const convertToRouteModule = <T extends Type<unknown>>(
  module: Promise<{ default: T }>,
  route?: Route,
): Route => {
  return {
    path: '',
    ...route,
    loadChildren: () => module.then((m) => m.default),
  };
};
