import React, { useState, useEffect } from 'react';
import { Button, Textarea } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import bridge from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { getRoutes, addRouteReview, getRouteReviews } from '../../shared/api/routes';
import styles from './index.module.css';

const Routes = observer(() => {
  const [routes, setRoutes] = useState([]);
  const [reviews, setReviews] = useState({});
  const [userId, setUserId] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await bridge.send('VKWebAppGetUserInfo', {});
        console.log(userInfo);
        setUserId(userInfo.id);
        const routesData = await getRoutes();
        if (routesData.data) {
          setRoutes(routesData.data);
        }
      } catch (error) {
        console.error("Error while fetching user info:", error);
      }
    };

    fetchData();
  }, []);

  
  const handleReviewInputChange = (event, routeId) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [routeId]: event.target.value,
    }));
  };

  const handleAddReview = async (routeId) => {
    try {
      await addRouteReview(routeId, reviews[routeId], userId);
      const routeReviews = await getRouteReviews(routeId);
      setReviews((prevReviews) => ({
        ...prevReviews,
        [routeId]: '',
      }));
      setReviews(routeReviews);
    } catch (error) {
      console.error("Error while adding route review:", error);
    }
  };

  const handleViewReviews = async (routeId) => {
    try {
      const routeReviews = await getRouteReviews(routeId);
      const updatedReviews = {};
  
      // Запрос информации о каждом пользователе, написавшем отзыв
      for (const review of routeReviews.data) {
        try {
          if (!review.user_id) {
            console.warn("Review with missing user_id:", review);
            continue; // Пропустить отзыв без user_id
          }
  
          const userInfo = await bridge.send('VKWebAppGetUserInfo', {
            user_id: review.user_id,
          });
  
          if (!userInfo || userInfo.error_type) {
            console.warn("Error fetching user info for user ID", review.user_id, ":", userInfo);
            continue; // Пропустить отзыв с ошибкой получения информации о пользователе
          }
  
          // Обновление отзыва с информацией о пользователе
          updatedReviews[review.id] = {
            ...review,
            user_info: userInfo,
          };
        } catch (error) {
          console.error("Error while fetching user info for review ID", review.id, "and user ID", review.user_id, ":", error);
          // Возможно, добавить какую-то обработку ошибки, например, игнорирование этого отзыва и продолжение цикла
        }
      }
  
      setReviews((prevReviews) => ({
        ...prevReviews,
        [routeId]: updatedReviews,
      }));
  
      setExpandedReviews((prevExpanded) => ({
        ...prevExpanded,
        [routeId]: true,
      }));
    } catch (error) {
      console.error("Error while getting route reviews for route ID", routeId, ":", error);
    }
  };
  
  return (
    <div className={styles.layout}>
      <div className={styles.header}>Маршруты для вас</div>
      {routes.map((route) => (
        <div className={styles.route} key={route.id}>
          <div className={styles.route__header}>
            <div className={styles.route__name}>“{route.name}”</div>
            <div className={styles.route__from}>от Ивана Иванова</div>
          </div>
          <div className={styles.route__content}>
            <div className={styles.route__point}>
              <div className={styles.route__point__image}>
                <img src='images/point.svg' alt="point" />
              </div>
              <div>{route.places[0].name}</div>
            </div>
            <div>
              <img className={styles.arrow} src='images/arrow.svg' alt="arrow" />
            </div>
            <div className={styles.route__point}>
              <div className={styles.route__point__image}>
                <img src='images/point.svg' alt="point" />
              </div>
              <div>{route.places.slice(-1)[0].name}</div>
            </div>
          </div>
          <div className={styles.route__button}>
            <Button
              style={{ height: 36 }}
              onClick={() => routeNavigator.push(`/routes/${route.id}`)}
            >
              Идти
            </Button>
          </div>
          <div className={styles.reviewSection}>
            <Textarea
              value={reviews[route.id] || ''}
              onChange={(event) => handleReviewInputChange(event, route.id)}
              placeholder="Добавьте отзыв"
            />
            {expandedReviews[route.id] && (
              <div>
                {reviews[route.id] && (
                  <div>
                    <div>Отзывы:</div>
                    {Object.values(reviews[route.id]).map((review) => (
                      <div key={review.id}>
                        <div>
                          <img src={review.user_info.photo_100} alt="avatar" />
                          {`${review.user_info.first_name} ${review.user_info.last_name}:`}
                        </div>
                        <div>{review.review_text}</div>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  style={{ height: 36, marginLeft: 10 }}
                  onClick={() => setExpandedReviews((prevExpanded) => ({ ...prevExpanded, [route.id]: false }))}
                >
                  Скрыть отзывы
                </Button>
              </div>
            )}
            {!expandedReviews[route.id] && (
              <div className={styles.actions}>
                <div className={styles.addReviewButton}>
                  <Button
                    style={{ height: 36 }}
                    onClick={() => handleAddReview(route.id)}
                  >
                    Добавить отзыв
                  </Button>
                </div>
                <div className={styles.viewReviewsButton}>
                  <Button
                    style={{ height: 36 }}
                    onClick={() => handleViewReviews(route.id)}
                  >
                    Просмотреть отзывы
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
  
});

export default Routes;