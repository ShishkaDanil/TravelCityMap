import { http } from "..";
import { httpErrorHandler } from "../../helpers/http.error.handler";
import { makeAutoObservable } from 'mobx';

const getRoutesApi = () => http.get('/routes');
const getRouteApi = (id) => http.get(`/routes/${id}`)
const getRouteReviewsApi = (id) => http.get(`/routes/${id}/reviews`);
const addRouteReviewApi = (id, reviewText, userId) => http.post(`/routes/${id}/reviews`, { review_text: reviewText, user_id: userId });

export const getRoutes = httpErrorHandler(getRoutesApi);
export const getRoute = httpErrorHandler(getRouteApi);
export const getRouteReviews = httpErrorHandler(getRouteReviewsApi);
export const addRouteReview = httpErrorHandler(addRouteReviewApi);


