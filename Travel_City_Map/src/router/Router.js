import React, { useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { RouterProvider, useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { router, routes } from ".";
import { AdaptivityProvider, AppRoot, ConfigProvider, Epic, Root, SplitCol, Tabbar, TabbarItem, View } from "@vkontakte/vkui";
import { Icon28NewsfeedOutline } from "@vkontakte/icons";
import Routes from "../panels/routes/Routes";
import Intro from "../panels/intro/Intro";
import Home from "../panels/home/Home";
import Learn from "../panels/learn/Learn"
import Route from "../panels/route/Route";
import Travels from "../panels/travels/Travels";

function Router() {
  useEffect(() => {
    bridge.send('VKWebAppInit')
  }, [])

  const { view: activeView, panel: activePanel, modal: activeModal } = useActiveVkuiLocation();

  return (
    <Root activeView={'default_view'}>
      <View nav="default_view" activePanel={activePanel}> 
        <Intro id='intro' />
        <Home id='home'/>
        <Routes id='routes'/>
        <Route id='routesDetails'/>
        <Learn id='learn' />
        <Travels id='travel'/>
        
      </View>
    </Root>
   
    
  )
}

export default Router
