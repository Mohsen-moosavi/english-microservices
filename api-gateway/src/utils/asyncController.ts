import { Controller } from '@/types/controller';

export const asyncHandler =
  (controller: Controller): Controller =>
  (req, res, next) =>
    Promise.resolve(controller(req, res, next)).catch(next);
