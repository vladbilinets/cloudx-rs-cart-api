import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string | null {
  return request.query && request.query.userId ? String(request.query.userId) : null;
}
