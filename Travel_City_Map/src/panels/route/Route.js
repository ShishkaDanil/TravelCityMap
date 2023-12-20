import React, { useState, useEffect } from 'react';
import { Panel, Div, Button, Group, List, Cell, PanelHeader } from '@vkontakte/vkui';
import { Checkbox } from '@vkontakte/vkui';
import styles from  './index.module.css';
import { observer } from "mobx-react-lite"
import { categoriesStore } from '../../entities/categories/categories.store';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { routesStore } from '../../entities/routes/routes.store';
import { getRoute } from '../../shared/api/routes';
import { getDistant } from '../../shared/helpers/get.distant';
import bridge from '@vkontakte/vk-bridge';


const Route = observer(() => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);

  useEffect(async () => {
    const route = await getRoute(id);
    if (route.data) {
      setRoute(route.data);
      console.log(route.data);
    }
  }, [])

  const currentTime = new Date("2011-04-20T09:30:51.01");

  const routeNavigator = useRouteNavigator();
  return (
    <div className={styles.layout}>
      <div className={styles.header}>Маршрут</div>
      {
        route && (
          <div className={styles.route}>
            {route?.places.map((place, index) => (
              <>
                <div key={place.id} className={styles.point}>
                <div className={styles.point__image}>
                  <img src='images/point.svg' />
                </div>
                <div>
                  {place.name}
                </div>
              </div>
              {route?.places[index + 1] && (
                <div className={styles.distant}>
                  <img className={styles.route__arrow} src='images/arrow1.svg' />
                  {getDistant(
                    place.latitude, 
                    place.longitude, 
                    route.places[index + 1].latitude, 
                    route.places[index + 1].longitude).toFixed(1)
                    } км
                </div>
                
                )}
              </>
            ))}
          </div>
        )
      }
      

      <div className={styles.buttons}>
        <Button onClick={() => routeNavigator.push(`/travel/${id}`)}>
          Поехали
        </Button>
        <Button mode='secondary' onClick={() => routeNavigator.push('/routes')}>
          Другой маршрут
        </Button>
        <Button onClick={() => bridge.send("VKWebAppAddToChat", {action_title: 'Поделиться маршрутом'})}>Поделиться</Button>
      </div>
    </div>
  );
});

export default Route;
