import { AxiosError, AxiosResponse } from 'axios';

export function httpErrorHandler(
  request,
) {
  return async (...params) => {
    try {
      const response = await request(...params);
      return {
        data: response.data,
        exception: null,
      };
    } catch (e) {
      return {
        data: null,
        exception: e,
      };
    }
  };
}
