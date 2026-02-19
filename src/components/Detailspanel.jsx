import React from "react";

const Badge = ({ text, color }) => (
    <span style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 12,
        fontSize: 11,
        fontWeight: 600,
        background: color || "#6c63ff",
        color: "#fff"
    }}>
        {text}
    </span>
);

const Row = ({ label, value }) => {
    if (value === null || value === undefined || value === "") return null;
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {label}
            </div>
            <div style={{ fontSize: 13, color: "#333", wordBreak: "break-word" }}>
                {String(value)}
            </div>
        </div>
    );
};

const typeColors = {
    USER: "#27ae60",
    AgentExecutionPlanner: "#e74c3c",
    InvokeAgent: "#2980b9",
    GeneratePrompt: "#8e44ad",
    ConditionalStep: "#e67e22",
    Summarizer: "#16a085",
    ResponseFormulator: "#2c3e50",
};

const DetailsPanel = ({ selectedData }) => {
    if (!selectedData) {
        return (
            <div style={{ padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🖱️</div>
                <p style={{ color: "#aaa", fontSize: 13 }}>
                    Click a node or edge to see details
                </p>
            </div>
        );
    }

    const isEdge = Boolean(selectedData.source);

    return (
        <div style={{ padding: 16 }}>

            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: 12,
                marginBottom: 16
            }}>
                <div>
                    <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>
                        {isEdge ? "EDGE" : "NODE"}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>
                        {selectedData.label || selectedData.id || `Step ${selectedData.step}`}
                    </div>
                </div>
                {selectedData.type && (
                    <Badge
                        text={selectedData.type}
                        color={typeColors[selectedData.type] || "#6c63ff"}
                    />
                )}
            </div>

            {/* Node fields */}
            {!isEdge && (
                <>
                    <Row label="ID" value={selectedData.id} />
                    <Row
                        label="Execution Time"
                        value={selectedData.executionTime ? `${selectedData.executionTime}s` : null}
                    />
                    <Row
                        label="Status"
                        value={selectedData.is_error === "true" ? "❌ Error" : "✅ Success"}
                    />
                </>
            )}

            {/* Edge fields */}
            {isEdge && (
                <>
                    <Row label="Step" value={selectedData.step} />
                    <Row label="From" value={selectedData.source} />
                    <Row label="To" value={selectedData.target} />
                </>
            )}

            {/* Input/Output for nodes */}
            {selectedData.input && (
                <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 4, textTransform: "uppercase" }}>
                        Input
                    </div>
                    <div style={{
                        background: "#f8f9fa",
                        border: "1px solid #e9ecef",
                        borderRadius: 6,
                        padding: 10,
                        fontSize: 12,
                        color: "#333",
                        maxHeight: 120,
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word"
                    }}>
                        {typeof selectedData.input === "string"
                            ? selectedData.input
                            : JSON.stringify(selectedData.input, null, 2)}
                    </div>
                </div>
            )}

            {selectedData.output && (
                <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 4, textTransform: "uppercase" }}>
                        Output
                    </div>
                    <div style={{
                        background: "#f0fff4",
                        border: "1px solid #c6f6d5",
                        borderRadius: 6,
                        padding: 10,
                        fontSize: 12,
                        color: "#333",
                        maxHeight: 120,
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word"
                    }}>
                        {selectedData.output}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsPanel;
