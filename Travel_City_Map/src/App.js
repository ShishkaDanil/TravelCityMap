import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { http } from './shared/api';
import { RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { router } from './router';
import Router from './router/Router';


const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');

      setUser(user);
    }
    fetchData();
  }, []);
  http

  useEffect(() => {
    // Проверяем, было ли приложение запущено ранее
    const isFirstLaunch = sessionStorage.getItem('isFirstLaunch') === null;

    // Если это первый запуск, переходим на Intro.js
    if (isFirstLaunch) {
      setActivePanel('intro');
      // Помечаем, что приложение уже запущено
      sessionStorage.setItem('isFirstLaunch', 'false');
    }
  }, []);


  return (
    <ConfigProvider appearance="light">
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              
              {/* <View activePanel={activePanel}>
                <Intro id="intro" />
                <Home id="home"  />
              </View> */}
              <RouterProvider router={router}>
                <Router />
              </RouterProvider>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
