import React, { useState } from 'react';
import {
  EmbeddedScene,
  PanelBuilders,
  SceneControlsSpacer,
  SceneFlexItem,
  SceneFlexLayout,
  SceneQueryRunner,
  SceneRefreshPicker,
  SceneTimePicker,
  SceneTimeRange,
  SceneReactObject,
} from '@grafana/scenes';
import { Input, Button } from '@grafana/ui';

const PROMETHEUS_DATASOURCE_UID = 'begvx80c4m3nkd';

const PrometheusQueryComponent = ({ onQuerySubmit }: { onQuerySubmit: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  return (
    <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Input
        value={query}
        placeholder="Enter PromQL Query..."
        onChange={(e) => setQuery(e.currentTarget.value)}
        style={{ width: '400px' }}
      />
      <Button onClick={() => onQuerySubmit(query)}>Run Query</Button>
    </div>
  );
};

export function promQlScene() {
  const timeRange = new SceneTimeRange({ from: 'now-6h', to: 'now' });

  const queryRunner = new SceneQueryRunner({
    datasource: { uid: PROMETHEUS_DATASOURCE_UID },
    queries: [
      {
        refId: 'A',
        expr: 'up', // Default PromQL query
        legendFormat: '{{instance}}',
        interval: '5s',
      },
    ],
    maxDataPoints: 100,
  });

  return new EmbeddedScene({
    $timeRange: timeRange,
    $data: queryRunner,
    body: new SceneFlexLayout({
      direction: 'column',
      children: [
        new SceneFlexItem({
          width: '100%',
          height: 100,
          body: new SceneReactObject({
            component: () => (
              <PrometheusQueryComponent
                onQuerySubmit={(newQuery) => {
                  queryRunner.setState({
                    queries: [{ ...queryRunner.state.queries[0], expr: newQuery }],
                  });
                  queryRunner.runQueries();
                }}
              />
            ),
          }),
        }),
        new SceneFlexItem({
          minHeight: 300,
          body: PanelBuilders.timeseries().setTitle('Prometheus Query Result').build(),
        }),
      ],
    }),
    controls: [
      new SceneTimePicker({ isOnCanvas: true }),
      new SceneRefreshPicker({
        intervals: ['5s', '1m', '1h'],
        isOnCanvas: true,
      }),
      new SceneControlsSpacer(),
    ],
  });
}
