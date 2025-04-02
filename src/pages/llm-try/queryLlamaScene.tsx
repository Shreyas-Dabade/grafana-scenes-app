import React, { useState } from 'react';
import {
  EmbeddedScene,
  SceneFlexLayout,
  SceneFlexItem,
  //PanelBuilders,
  SceneReactObject,
} from '@grafana/scenes';

// ✅ React component for querying Llama
const QueryLlamaComponent = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('Enter a query and click "Submit" to get a response.');

  // ✅ Handle query submission
  const handleQuery = async () => {
    if (!query.trim()) {
      setResponse('⚠️ Please enter a valid query.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/llama/query-llama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response || '⚠️ No response from backend.');
    } catch (error) {
      console.error('Error querying backend:', error);
      setResponse('❌ Error: Failed to fetch response from backend.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Enter your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '10px',
          width: '70%',
          marginRight: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleQuery}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#008CBA',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Submit
      </button>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          minHeight: '100px',
          border: '1px solid #ccc',
        }}
      >
        {response}
      </div>
    </div>
  );
};

// ✅ Main Scene Export
export function queryLlamaScene() {
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      direction: 'column',
      children: [
        new SceneFlexItem({
          width: '100%',
          height: 400,
          body: new SceneReactObject({
            component: QueryLlamaComponent, // ✅ Correctly wrapped React component
          }),
        }),
      ],
    }),
  });
}
