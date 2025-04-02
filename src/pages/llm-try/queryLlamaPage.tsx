import { SceneAppPage } from '@grafana/scenes';
import { queryLlamaScene } from './queryLlamaScene';
import { prefixRoute } from '../../utils/utils.routing';
import { ROUTES } from '../../constants';

export const queryLlamaPage = new SceneAppPage({
  title: 'Query Llama',
  url: prefixRoute(ROUTES.llmquery), // Ensure correct routing
  getScene: queryLlamaScene, // Call the scene function directly
});