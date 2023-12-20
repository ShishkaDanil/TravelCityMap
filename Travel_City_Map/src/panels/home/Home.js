import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, Div, Avatar, Header, Separator } from '@vkontakte/vkui';
import mmrgl from 'mmr-gl';
import 'mmr-gl/dist/mmr-gl.css';
import axios from 'axios';
import { pointsStore } from '../../entities/points/points.store';
import { categoriesStore } from '../../entities/categories/categories.store';
import { observer } from 'mobx-react-lite';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './Home.styles.css'
import { Icon28Menu } from '@vkontakte/icons';
import { Icon28LocationMapOutline } from '@vkontakte/icons';
import { Icon28UserCircleOutline } from '@vkontakte/icons';


const Map = observer(() => {
  useEffect(async () => {
    mmrgl.accessToken = '581993bd45c4d9f1bceb4399c4036ee24a21220efd7889feced09887fe7b4173';
    const map = new mmrgl.Map({
      container: 'map',
      zoom: 12,
      center: [39.714083, 47.233661],
      style: 'mmr://api/styles/main_style.json',
      hash: true,
    });
  
    for (const mark of pointsStore.marks) {
      mark.addTo(map);
    }
    return () => {
      if (map) map.remove();
    };
  }, [pointsStore.getPoints]);
  return <div id="map" style={{ width: '100%', height: '110%' }} />;
})

const Home = ({ id, fetchedUser, selectedCategories, placesData }) => {
  useEffect(() => {
    pointsStore.fetchPoints()
  }, [categoriesStore.selectedCategories])
  const routeNavigator = useRouteNavigator();
  
  return (
    <Panel id={id}>
      <div style={{ height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column' }}>
        {fetchedUser && (
          <Group>
            <Div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={fetchedUser.photo_200} size={72} />
              <div style={{ marginLeft: '12px' }}>
                <Header mode="primary">{`${fetchedUser.first_name} ${fetchedUser.last_name}`}</Header>
              </div>
            </Div>
          </Group>
        )}

        <Separator style={{ marginBottom: '8px' }} />

        <div style={{ flex: 1 }}>
          <Map />
        </div>

          <div className="labels-container">
            
            <Icon28Menu onClick={() => routeNavigator.push('/')} />
            <Icon28LocationMapOutline onClick={() => routeNavigator.push('/routes/')}/>
            <Icon28UserCircleOutline/>
          </div>


      </div>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  selectedCategories: PropTypes.object.isRequired,
};

export default Home;
