import React, { useState, useEffect } from 'react';
import { Panel, Div, Button, Group, List, Cell, PanelHeader } from '@vkontakte/vkui';
import { Checkbox } from '@vkontakte/vkui';
import { observer } from "mobx-react-lite"
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { getRoute } from '../../shared/api/routes';
import { getDirections } from '../../shared/api/vk';
import { shapeToCoordinates } from '../../shared/helpers/shape.to.coordinates';
import mmrgl from 'mmr-gl';
import './Travels.styles.css';
import { Icon28Menu } from '@vkontakte/icons';
import { Icon28LocationMapOutline } from '@vkontakte/icons';
import { Icon28UserCircleOutline } from '@vkontakte/icons';
import { YMaps, Map, Placemark, RoutePanel } from 'react-yandex-maps';

const Travels = observer(() => {
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(async () => {
    const route = await getRoute(id);

    if (route.data) {
      const directions = await getDirections(route.data.places.map(({
        latitude, 
        longitude
      }) => ({
        lat: latitude,
        lon: longitude,
      })))
      if (directions.data) {
        setMarks(route.data.places.map((place) => [place.latitude, place.longitude]))
        const shapes = directions.data.trips[0].trip.legs.map((leg) => leg.shape);
        const coordinates = shapes.flatMap((shape) => shapeToCoordinates(shape));
        setCoordinates(coordinates);
      }
    }
  }, [])

  const routeNavigator = useRouteNavigator();

  return (
    <div style={{ height: '100vh' }}>
      <YMaps query={{ apikey: '152ca095-c260-40ff-9c48-c1a1fba09f70' }}>
        <Map
          defaultState={{
            center: [47.233661, 39.714083],
            zoom: 12,
          }}
          width="100%"
          height="100%"
        >
          {marks.map((mark, index) => (
            <Placemark key={index} geometry={mark} />
          ))}
          {coordinates.length > 0 && (
            <RoutePanel
              routes={[
                {
                  points: coordinates.map((coord) => coord.join(',')),
                },
              ]}
            />
          )}
        </Map>
      </YMaps>

      <div className="labels-container">
        <Icon28Menu onClick={() => routeNavigator.push('/')} />
        <Icon28LocationMapOutline onClick={() => routeNavigator.push('/routes/')} />
        <Icon28UserCircleOutline />
      </div>
    </div>
  );
});

export default Travels;
