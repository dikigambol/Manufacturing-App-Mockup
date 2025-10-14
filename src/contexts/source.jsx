import { utils } from "@/utils/function";
import { createContext, useEffect, useState } from "react";
import { default_source_data } from "@/utils/constant";

export const SourceContext = createContext(undefined);

export const SourceProvider = ({ children }) => {
    const [sources, setSources] = useState([]);

    const loadSources = () => {
        try {
            const data = localStorage.getItem("dataSources");

            // If localStorage is empty, initialize from default_source_data
            if (!data || data === "null") {
                localStorage.setItem("dataSources", JSON.stringify(default_source_data));
                const initialized = default_source_data.map(item => ({
                    ...item,
                    fileData: utils.base64ToText(item?.fileData),
                }));
                setSources(initialized);
                return;
            }

            const stored = JSON.parse(data).map(item => ({
                ...item,
                fileData: utils.base64ToText(item?.fileData),
            }))
            setSources(stored || []);
        } catch (err) {
            // console.error("Failed to parse dataSources", err);
            // On error, initialize from default
            localStorage.setItem("dataSources", JSON.stringify(default_source_data));
            const initialized = default_source_data.map(item => ({
                ...item,
                fileData: utils.base64ToText(item?.fileData),
            }));
            setSources(initialized);
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
