import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Upload, Trash2, Info, Database, FileJson, RefreshCw } from "lucide-react";
import DataBackup from '@/utils/dataBackup';

const DataManagement = () => {
    const [message, setMessage] = useState(null);
    const [storageInfo, setStorageInfo] = useState(null);
    const fileInputRef = useRef(null);

    const handleDownloadBackup = () => {
        try {
            const backup = DataBackup.downloadBackup();
            setMessage({
                type: 'success',
                text: '✅ Backup file downloaded successfully! Save this file before deploying to server.'
            });
        } catch (error) {
            setMessage({
                type: 'error',
                text: `❌ Download failed: ${error.message}`
            });
        }
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const result = await DataBackup.uploadBackup(file);
            if (result.success) {
                setMessage({
                    type: 'success',
                    text: `✅ ${result.message}\nImported: ${result.imported.dashboards} dashboards, ${result.imported.dataSources} data sources, ${result.imported.layoutTemplates} layout templates`
                });
                // Auto-refresh after 2 seconds
                setTimeout(() => window.location.reload(), 2000);
            } else {
                setMessage({
                    type: 'error',
                    text: `❌ ${result.message}`
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: `❌ Import failed: ${error.message}`
            });
        }
        // Reset file input
        event.target.value = '';
    };

    const handleClearAll = () => {
        const confirmed = window.confirm(
            '⚠️ WARNING: This will delete ALL your dashboard configurations, data sources, and layout templates!\n\nAre you sure you want to continue?'
        );

        if (confirmed) {
            const doubleConfirm = window.confirm(
                '⚠️ FINAL WARNING: This action CANNOT be undone!\n\nClick OK to proceed with deletion.'
            );

            if (doubleConfirm) {
                DataBackup.clearAll();
                setMessage({
                    type: 'success',
                    text: '✅ All data cleared. Refreshing page...'
                });
                setTimeout(() => window.location.reload(), 1500);
            }
        }
    };

    const handleShowStorageInfo = () => {
        const info = DataBackup.printStorageInfo();
        setStorageInfo(info);
    };

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Data Management</h1>
                <p className="text-gray-500">Backup, restore, and manage your dashboard configurations</p>
            </div>

            {message && (
                <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
                    <AlertDescription className="whitespace-pre-line">
                        {message.text}
                    </AlertDescription>
                </Alert>
            )}

            {/* Export/Backup Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Export Data (Backup)
                    </CardTitle>
                    <CardDescription>
                        Download a backup file containing all your dashboard configurations, data sources, and layout templates.
                        Save this file before deploying to a new server or sharing with others.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={handleDownloadBackup} className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Download Backup File
                    </Button>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            What's included in the backup:
                        </p>
                        <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                            <li>All dashboard layouts (Line 1, Line 2, Line 3, etc.)</li>
                            <li>Data source configurations</li>
                            <li>Saved layout templates from Layout Designer</li>
                            <li>Widget configurations and positions</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Import/Restore Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Import Data (Restore)
                    </CardTitle>
                    <CardDescription>
                        Restore your dashboard configurations from a backup file.
                        This will merge with existing data (duplicates will be overwritten).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Backup File
                    </Button>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Before importing:
                        </p>
                        <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                            <li>Download a current backup first (as safety measure)</li>
                            <li>Make sure the backup file is valid JSON format</li>
                            <li>Page will automatically refresh after import</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Storage Info Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Storage Information
                    </CardTitle>
                    <CardDescription>
                        View how much browser storage is being used by your dashboard data
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        onClick={handleShowStorageInfo}
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        <Info className="mr-2 h-4 w-4" />
                        Show Storage Info
                    </Button>

                    {storageInfo && (
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border space-y-2">
                            <p className="font-semibold">Total Storage: {storageInfo.totalSizeKB} KB ({storageInfo.totalSizeMB} MB)</p>
                            <div className="space-y-2 text-sm">
                                {Object.entries(storageInfo.details).map(([key, info]) => (
                                    <div key={key} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                                        <span className="font-medium">{key}</span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {info.items} items • {info.sizeKB} KB
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <Trash2 className="h-5 w-5" />
                        Danger Zone
                    </CardTitle>
                    <CardDescription>
                        Irreversible actions. Use with extreme caution.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        onClick={handleClearAll}
                        variant="destructive"
                        className="w-full sm:w-auto"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear All Data
                    </Button>

                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm font-semibold mb-2 text-red-700 dark:text-red-400">
                            ⚠️ WARNING:
                        </p>
                        <p className="text-sm">
                            This will permanently delete all dashboard configurations, data sources, and layout templates.
                            Make sure to download a backup first!
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Developer Tools */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileJson className="h-5 w-5" />
                        Developer Tools
                    </CardTitle>
                    <CardDescription>
                        Advanced tools for developers (use browser console)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border space-y-2 font-mono text-xs">
                        <p className="font-semibold text-sm mb-2">Available in browser console:</p>
                        <p><code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">DataBackup.downloadBackup()</code> - Download backup</p>
                        <p><code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">DataBackup.exportAll()</code> - Get backup object</p>
                        <p><code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">DataBackup.importAll(backup)</code> - Restore from object</p>
                        <p><code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">DataBackup.printStorageInfo()</code> - Show storage details</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DataManagement;

