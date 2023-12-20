import { http } from "..";
import { httpErrorHandler } from "../../helpers/http.error.handler";

const getCategoriesApi = () => http.get('categories');

export const getCategories = httpErrorHandler(getCategoriesApi);
