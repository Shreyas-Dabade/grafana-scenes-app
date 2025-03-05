import { SceneAppPage } from '@grafana/scenes';
import { ROUTES } from '../../constants';
import { prefixRoute } from '../../utils/utils.routing';
import { newStaticScene } from './newStaticScenes';

// ✅ Define the page
export const newStaticPage = new SceneAppPage({
  title: 'New Static Page',
  subTitle: 'This is a static page with no backend calls.',
  url: prefixRoute(ROUTES.NewStaticPage), // ✅ Correct URL route
  hideFromBreadcrumbs: true,
  getScene: () => newStaticScene,
});
