/**
 * Data Backup & Restore Utility
 * 
 * Handles export/import of dashboard configurations, data sources, and layout templates
 * Use this to backup your data before deploying to server or moving between environments
 */

export const DataBackup = {
    /**
     * Export ALL data (dashboard configs, data sources, layout templates)
     * @returns {Object} Complete backup of all localStorage data
     */
    exportAll() {
        const backup = {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            data: {
                dashboards: JSON.parse(localStorage.getItem('dashboard_list') || '[]'),
                dataSources: JSON.parse(localStorage.getItem('dataSources') || '[]'),
                layoutTemplates: JSON.parse(localStorage.getItem('layoutTemplates') || '[]'),
                selectedLine: localStorage.getItem('selectedLine') || 'line_1',
            }
        };
        return backup;
    },

    /**
     * Import ALL data (restores dashboard configs, data sources, layout templates)
     * @param {Object} backup - Backup object from exportAll()
     * @returns {Object} Result with success status and message
     */
    importAll(backup) {
        try {
            if (!backup || !backup.data) {
                throw new Error('Invalid backup format');
            }

            // Restore each data type
            if (backup.data.dashboards) {
                localStorage.setItem('dashboard_list', JSON.stringify(backup.data.dashboards));
            }
            if (backup.data.dataSources) {
                localStorage.setItem('dataSources', JSON.stringify(backup.data.dataSources));
            }
            if (backup.data.layoutTemplates) {
                localStorage.setItem('layoutTemplates', JSON.stringify(backup.data.layoutTemplates));
            }
            if (backup.data.selectedLine) {
                localStorage.setItem('selectedLine', backup.data.selectedLine);
            }

            return {
                success: true,
                message: 'Data imported successfully! Please refresh the page.',
                imported: {
                    dashboards: backup.data.dashboards?.length || 0,
                    dataSources: backup.data.dataSources?.length || 0,
                    layoutTemplates: backup.data.layoutTemplates?.length || 0,
                }
            };
        } catch (error) {
            return {
                success: false,
                message: `Import failed: ${error.message}`,
            };
        }
    },

    /**
     * Download backup as JSON file
     */
    downloadBackup() {
        const backup = this.exportAll();
        const dataStr = JSON.stringify(backup, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `dashboard-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log('✅ Backup downloaded successfully!');
        return backup;
    },

    /**
     * Upload and restore backup from JSON file
     * @param {File} file - JSON file from file input
     * @returns {Promise<Object>} Result with success status and message
     */
    async uploadBackup(file) {
        try {
            const text = await file.text();
            const backup = JSON.parse(text);
            return this.importAll(backup);
        } catch (error) {
            return {
                success: false,
                message: `Upload failed: ${error.message}`,
            };
        }
    },

    /**
     * Clear ALL data (use with caution!)
     */
    clearAll() {
        const keys = ['dashboard_list', 'dataSources', 'layoutTemplates', 'selectedLine'];
        keys.forEach(key => localStorage.removeItem(key));
        console.log('⚠️ All data cleared from localStorage');
        return { success: true, message: 'All data cleared' };
    },

    /**
     * Export only dashboards
     */
    exportDashboards() {
        return JSON.parse(localStorage.getItem('dashboard_list') || '[]');
    },

    /**
     * Export only data sources
     */
    exportDataSources() {
        return JSON.parse(localStorage.getItem('dataSources') || '[]');
    },

    /**
     * Export only layout templates
     */
    exportLayoutTemplates() {
        return JSON.parse(localStorage.getItem('layoutTemplates') || '[]');
    },

    /**
     * Get storage size info
     */
    getStorageInfo() {
        let totalSize = 0;
        const details = {};

        ['dashboard_list', 'dataSources', 'layoutTemplates'].forEach(key => {
            const item = localStorage.getItem(key);
            if (item) {
                const size = new Blob([item]).size;
                totalSize += size;
                details[key] = {
                    size: size,
                    sizeKB: (size / 1024).toFixed(2),
                    items: JSON.parse(item).length,
                };
            }
        });

        return {
            totalSize,
            totalSizeKB: (totalSize / 1024).toFixed(2),
            totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
            details,
        };
    },

    /**
     * Print storage info to console
     */
    printStorageInfo() {
        const info = this.getStorageInfo();
        console.log('📊 Storage Info:');
        console.log(`   Total: ${info.totalSizeKB} KB (${info.totalSizeMB} MB)`);
        console.log('   Details:', info.details);
        return info;
    },
};

// Browser console shortcuts
if (typeof window !== 'undefined') {
    window.DataBackup = DataBackup;
    console.log('💾 DataBackup utility loaded! Available commands:');
    console.log('   - DataBackup.downloadBackup()      // Download backup file');
    console.log('   - DataBackup.exportAll()           // Get backup object');
    console.log('   - DataBackup.importAll(backup)     // Restore from backup');
    console.log('   - DataBackup.printStorageInfo()    // Show storage usage');
}

export default DataBackup;

