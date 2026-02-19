import React, { useState } from 'react';
import QuestionBar from './components/Questionbar';
import WorkflowGraph from './components/Workflowgraph';
import DetailsPanel from './components/Detailspanel';
import sampleResponse from './data/sampleResponse.json';
import { transformToElements } from './utils/transform';

function App() {
  const [elements, setElements] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuerySubmit = (query) => {
    console.log("Query submitted:", query);
    setIsLoading(true);
    setError(null);
    setSelectedData(null);

    setTimeout(() => {
      try {
        const transformed = transformToElements(sampleResponse);
        console.log("Elements created:", transformed.length);
        setElements(transformed);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to process data: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif", overflow: "hidden" }}>

      {/* Query bar at top */}
      <QuestionBar onSubmit={handleQuerySubmit} isLoading={isLoading} />

      {/* Status bar */}
      <div style={{
        background: "#f8f8f8",
        borderBottom: "1px solid #eee",
        padding: "4px 16px",
        fontSize: 12,
        color: "#666",
        display: "flex",
        gap: 16
      }}>
        <span>Nodes: <b>{elements.filter(e => !e.data.source).length}</b></span>
        <span>Edges: <b>{elements.filter(e => !!e.data.source).length}</b></span>
        {isLoading && <span style={{ color: "#6c63ff" }}>⏳ Loading...</span>}
        {error && <span style={{ color: "red" }}>❌ {error}</span>}
      </div>

      {/* Graph + Details side by side */}
      {/* FIXED: was missing proper flex layout — details panel was below graph */}
      <div style={{ flex: 1, display: "flex", flexDirection: "row", overflow: "hidden" }}>

        {/* Graph takes remaining space */}
        <div style={{ flex: 1, height: "100%", position: "relative" }}>
          {elements.length > 0 ? (
            <WorkflowGraph
              elements={elements}
              onSelect={setSelectedData}
            />
          ) : (
            <div style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#bbb",
              flexDirection: "column",
              gap: 8
            }}>
              <div style={{ fontSize: 48 }}>🔍</div>
              <div style={{ fontSize: 14 }}>
                {isLoading ? "Building graph..." : "Submit a query to visualize the workflow"}
              </div>
            </div>
          )}
        </div>

        {/* Details panel fixed width on right */}
        <div style={{
          width: 320,
          flexShrink: 0,
          borderLeft: "1px solid #ddd",
          overflowY: "auto",
          background: "#fff"
        }}>
          <DetailsPanel selectedData={selectedData} />
        </div>

      </div>
    </div>
  );
}

export default App;
