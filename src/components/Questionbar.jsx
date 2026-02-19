import React, { useState } from 'react';

const QuestionBar = ({ onSubmit, isLoading }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // FIXED: was `!query.trim()` — inverted condition, never submitted
        if (query.trim() && !isLoading) {
            onSubmit(query);
            setQuery('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                padding: "10px 16px",
                gap: 8,
                borderBottom: "1px solid #ddd",
                background: "#fff"
            }}
        >
            <input
                style={{
                    flex: 1,
                    padding: "8px 12px",
                    fontSize: 14,
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    outline: "none"
                }}
                placeholder="Ask something... (e.g. List the top 5 procurement orders)"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(e); }}
                disabled={isLoading}
                value={query}
            />
            <button
                type="submit"
                style={{
                    padding: "8px 20px",
                    background: isLoading ? "#aaa" : "#6c63ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    fontSize: 14
                }}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Submit"}
            </button>
        </form>
    );
};

export default QuestionBar;
