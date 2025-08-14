import { utils } from "@/utils/function";
import { createContext, useEffect, useState } from "react";

export const SourceContext = createContext(undefined);

export const SourceProvider = ({ children }) => {
    const [sources, setSources] = useState([]);

    const loadSources = () => {
        try {
            const data = localStorage.getItem("dataSources");
            const stored = JSON.parse(data).map(item => ({
                ...item,
                fileData: utils.base64ToText(item?.fileData),
            }))
            setSources(stored || []);
        } catch (err) {
            // console.error("Failed to parse dataSources", err);
            setSources([]);
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
