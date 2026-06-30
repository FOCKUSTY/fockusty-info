import { convertToRouteModule } from '@/utils/load-module';

export const ResumeRoute = convertToRouteModule(import('./resume.module'));
export default ResumeRoute;
