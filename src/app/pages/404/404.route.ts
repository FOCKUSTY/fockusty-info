import { convertToRouteModule } from "@/utils/load-module";

export const NotFoundRoute = convertToRouteModule(import("./404.module"));
export default NotFoundRoute;
