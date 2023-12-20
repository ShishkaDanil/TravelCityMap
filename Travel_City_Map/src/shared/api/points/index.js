import { http } from "..";
import { httpErrorHandler } from "../../helpers/http.error.handler";

const getPointsApi = (categoriesIds) => http.post('places/search', { categories: categoriesIds });

export const getPoints = httpErrorHandler(getPointsApi);
