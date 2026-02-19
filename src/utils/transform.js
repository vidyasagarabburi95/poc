// FIXED: Original had two bugs:
// 1. Guard check was `data.nodes` (truthy check) instead of `!data.nodes`
//    This caused early return on valid data
// 2. Edge loop was INSIDE the forEach, creating duplicate edges

export const transformToElements = (data) => {
    // Validate input
    if (!data) {
        console.error("transformToElements: data is null/undefined");
        return [];
    }
    if (!data.nodes) {
        console.error("transformToElements: data.nodes is missing", data);
        return [];
    }
    if (!Array.isArray(data.nodes)) {
        console.error("transformToElements: data.nodes is not an array", data.nodes);
        return [];
    }

    const elements = [];

    // ── NODES ──────────────────────────────────────────────
    data.nodes.forEach((node, index) => {
        elements.push({
            data: {
                id: node.id || `node-${index}`,
                label: node.node_name || node.id || `node-${index}`,
                type: node.node_type || "Unknown",
                executionTime: node.properties?.executionTime ?? null,
                is_error: String(node.properties?.is_error ?? "false"),
                // Store a safe subset of properties for the details panel
                input:  node.properties?.input  ?? null,
                output: typeof node.properties?.output === "string"
                    ? node.properties.output.substring(0, 500)
                    : null,
            }
        });
    });

    // ── EDGES ──────────────────────────────────────────────
    // Prefer the edges array from the JSON (has correct source/target)
    if (data.edges && Array.isArray(data.edges)) {
        data.edges.forEach((edge) => {
            elements.push({
                data: {
                    id: `edge-${edge.label}`,
                    source: String(edge.source),
                    target: String(edge.target),
                    step: String(edge.label),
                }
            });
        });
    } else {
        // Fallback: sequential edges between nodes
        for (let i = 1; i < data.nodes.length; i++) {
            elements.push({
                data: {
                    id: `edge-${i}`,
                    source: data.nodes[i - 1].id,
                    target: data.nodes[i].id,
                    step: String(i),
                }
            });
        }
    }

    console.log(`transformToElements: ${elements.length} elements (${data.nodes.length} nodes)`);
    return elements;
};
