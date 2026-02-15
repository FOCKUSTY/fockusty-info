import { convertToRouteModule } from "@/utils/load-module";

export const HomeRoute = convertToRouteModule(import("./home.module"));
export default HomeRoute;
