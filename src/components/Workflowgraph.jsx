import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const WorkflowGraph = ({ elements, onSelect }) => {
    const cyRef = useRef(null);

    const stylesheet = [
        {
            selector: "node",
            style: {
                label: "data(label)",
                "text-valign": "center",
                "text-halign": "center",
                color: "#fff",
                "font-size": "9px",
                "background-color": "#6c63ff",
                width: 70,
                height: 70,
                "text-wrap": "wrap",
                "text-max-width": "65px",
                "border-width": 2,
                "border-color": "rgba(255,255,255,0.3)"
            }
        },
        {
            selector: "node[type='USER']",
            style: { "background-color": "#27ae60" }
        },
        {
            selector: "node[type='AgentExecutionPlanner']",
            style: { "background-color": "#e74c3c" }
        },
        {
            selector: "node[type='InvokeAgent']",
            style: { "background-color": "#2980b9" }
        },
        {
            selector: "node[type='GeneratePrompt']",
            style: { "background-color": "#8e44ad" }
        },
        {
            selector: "node[type='ConditionalStep']",
            style: { "background-color": "#e67e22" }
        },
        {
            selector: "node[type='Summarizer']",
            style: { "background-color": "#16a085" }
        },
        {
            selector: "node[type='ResponseFormulator']",
            style: { "background-color": "#2c3e50" }
        },
        {
            selector: "node[is_error='true']",
            style: {
                "background-color": "#c0392b",
                "border-color": "#ff0000",
                "border-width": 3
            }
        },
        {
            selector: "node:selected",
            style: {
                "border-color": "#f1c40f",
                "border-width": 4
            }
        },
        {
            selector: "edge",
            style: {
                width: 2,
                label: "data(step)",
                "font-size": "10px",
                "font-weight": "bold",
                color: "#555",
                "text-background-color": "#fff",
                "text-background-opacity": 0.8,
                "text-background-padding": "2px",
                "line-color": "#bbb",
                "target-arrow-color": "#bbb",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier"
            }
        },
        {
            selector: "edge:selected",
            style: {
                "line-color": "#f1c40f",
                "target-arrow-color": "#f1c40f",
                width: 3
            }
        }
    ];

    useEffect(() => {
        if (cyRef.current && elements.length > 0) {
            setTimeout(() => {
                cyRef.current?.fit(undefined, 40);
                cyRef.current?.center();
            }, 100);
        }
    }, [elements]);

    // FIXED: was `handleCyInt` (typo), and cy was never properly stored
    const handleCyInit = (cy) => {
        cyRef.current = cy;

        cy.on('tap', 'node', (event) => {
            const nodeData = event.target.data();
            onSelect?.(nodeData);
        });

        cy.on('tap', 'edge', (event) => {
            const edgeData = event.target.data();
            onSelect?.(edgeData);
        });

        cy.on('tap', (event) => {
            if (event.target === cy) {
                onSelect?.(null);
            }
        });
    };

    if (!elements || elements.length === 0) {
        return (
            <div style={{ padding: 40, textAlign: "center", color: "#aaa" }}>
                No graph data to display
            </div>
        );
    }

    return (
        <CytoscapeComponent
            elements={elements}
            layout={{
                name: "concentric",
                concentric: (node) => node.data('type') === 'USER' ? 10 : 1,
                levelWidth: () => 3,
                padding: 40,
                minNodeSpacing: 30
            }}
            style={{ width: "100%", height: "100%" }}
            stylesheet={stylesheet}
            cy={handleCyInit}
        />
    );
};

export default WorkflowGraph;
