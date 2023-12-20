import { makeAutoObservable, runInAction } from 'mobx';
import { getCategories } from '../../shared/api/categories/index'
import { getRoutes, getRouteReviews, addRouteReview } from '../../shared/api/routes';

class Routes {
  routes = [];

  constructor() {
  }
  getRouteReviews = async (id) => {
    try {
      const reviews = await getRouteReviews(id);
      if (reviews.data) {
        console.log("Route review")
        console.log(reviews.data)
        return reviews.data;
      }
    } catch (error) {
      console.error("Error while fetching route reviews:", error);
    }
  }

  addRouteReview = async (id, reviewText, userId) => {
    try {
      const response = await addRouteReviewApi(id, reviewText, userId);
      console.log("Response after adding route review:", response);
    } catch (error) {
      console.error("Error while adding route review:", error);
    }
  };
  getRoutes = async () => {
    const routes = await getRoutes();
    if (routes.data) {
      this.routes = routes.data;
    }
  }
}

export const routesStore = new Routes();