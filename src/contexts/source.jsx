import { utils } from "@/utils/function";
import { createContext, useEffect, useState } from "react";
import { default_source_data } from "@/utils/constant";

export const SourceContext = createContext(undefined);

export const SourceProvider = ({ children }) => {
    const [sources, setSources] = useState([]);

    // Function to load JSON data from external files
    const loadJsonData = async (filePath) => {
        try {
            // For development, we'll use dynamic imports
            // In production, you might want to use fetch or other methods
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error loading JSON from ${filePath}:`, error);
            return null;
        }
    };

    const loadSources = async () => {
        try {
            const data = localStorage.getItem("dataSources");

            // If localStorage is empty, initialize from default_source_data
            if (!data || data === "null") {
                // Load data from external JSON files
                const initialized = await Promise.all(
                    default_source_data.map(async (item) => {
                        let fileData = null;

                        if (item.filePath) {
                            // Load from external JSON file
                            fileData = await loadJsonData(item.filePath);
                        } else if (item.fileData) {
                            // Fallback to base64 data (for backward compatibility)
                            fileData = utils.base64ToText(item.fileData);
                        }

                        return {
                            ...item,
                            fileData: fileData,
                        };
                    })
                );

                // Filter out items that failed to load
                const validSources = initialized.filter(item => item.fileData !== null);

                localStorage.setItem("dataSources", JSON.stringify(validSources));
                setSources(validSources);
                return;
            }

            // Load from localStorage
            const stored = JSON.parse(data);
            setSources(stored || []);
        } catch (err) {
            console.error("Failed to parse dataSources", err);
            // On error, clear localStorage and initialize from default
            localStorage.removeItem("dataSources");

            // Try to reload from external files
            try {
                const initialized = await Promise.all(
                    default_source_data.map(async (item) => {
                        let fileData = null;

                        if (item.filePath) {
                            fileData = await loadJsonData(item.filePath);
                        } else if (item.fileData) {
                            fileData = utils.base64ToText(item.fileData);
                        }

                        return {
                            ...item,
                            fileData: fileData,
                        };
                    })
                );

                const validSources = initialized.filter(item => item.fileData !== null);
                localStorage.setItem("dataSources", JSON.stringify(validSources));
                setSources(validSources);
            } catch (reloadErr) {
                console.error("Failed to reload sources:", reloadErr);
                setSources([]);
            }
        }
    };

    useEffect(() => {
        loadSources();

        const handleStorage = (e) => {
            if (e.key === "dataSources") loadSources();
        };
        const handleCustomUpdate = () => loadSources();

        window.addEventListener("storage", handleStorage);
        window.addEventListener("dataSourcesUpdated", handleCustomUpdate);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("dataSourcesUpdated", handleCustomUpdate);
        };
    }, []);

    const getById = (id) => sources.find((src) => src.id === id);

    return (
        <SourceContext.Provider value={{ sources, getById, loadSources }}>
            {children}
        </SourceContext.Provider>
    );
};
