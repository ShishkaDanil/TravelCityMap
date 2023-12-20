import { RoutesConfig, createHashParamRouter, createPanel, createRoot, createView, createHashRouter, createModal } from "@vkontakte/vk-mini-apps-router";

export const routes = RoutesConfig.create([createRoot('default_root', [
  createView('default_view', [
    createPanel('intro', '/'),
    createPanel('home', '/home'),
    createPanel('routes', '/routes'),
    createPanel('routesDetails', '/routes/:id'),
    createPanel('travel', '/travel/:id')
  ]),
]),
])

export const router = createHashParamRouter(routes.getRoutes());