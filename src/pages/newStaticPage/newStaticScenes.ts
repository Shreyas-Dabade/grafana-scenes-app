import { EmbeddedScene, SceneFlexLayout, SceneObjectBase } from '@grafana/scenes';

// ✅ Define a simple static scene object (NO <div>)
class NewStaticScene extends SceneObjectBase {
  constructor() {
    super({});
  }
}

// ✅ Export the scene
export const newStaticScene = new EmbeddedScene({
  body: new SceneFlexLayout({
    children: [new NewStaticScene()], // ✅ Using a scene object instead of <div>
  }),
});
