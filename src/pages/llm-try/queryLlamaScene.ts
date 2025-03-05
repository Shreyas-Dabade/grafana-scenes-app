import { EmbeddedScene, SceneFlexLayout, SceneFlexItem, PanelBuilders } from '@grafana/scenes';

export function queryLlamaScene() {
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      direction: 'column', // ✅ Stack elements vertically
      children: [
        new SceneFlexItem({
          width: '100%',
          height: 300,
          body: PanelBuilders.text()
            .setTitle('Query Llama Panel')
            .setOption('content', 'Llama 3 is ready for queries!')
            .build(),
        }),
      ],
    }),
  });
}
