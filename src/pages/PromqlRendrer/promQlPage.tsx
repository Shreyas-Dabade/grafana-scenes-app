import { SceneAppPage } from '@grafana/scenes';
import { promQlScene } from './promQlScenes';
import { prefixRoute } from '../../utils/utils.routing';
import { ROUTES } from '../../constants';

export const promQlPage = new SceneAppPage({
  title: 'PromQL Query',
  url: prefixRoute(ROUTES.PromqlRendrer),
  subTitle: 'Run PromQL queries and visualize results dynamically.',
  getScene: () => promQlScene(),
});
