import { convertToRouteModule } from '@/utils/load-module';

export const OrderRoute = convertToRouteModule(import('./order.module'));
export default OrderRoute;
