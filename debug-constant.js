// Debug script to test constant.js with external JSON files
import { default_source_data } from './src/utils/constant.js';
import fs from 'fs';
import path from 'path';

console.log('Testing constant.js with external JSON files...');

try {
    console.log('✅ Successfully imported default_source_data');
    console.log('Array length:', default_source_data.length);

    // Test JSON operations
    const stringified = JSON.stringify(default_source_data);
    console.log('✅ JSON.stringify works, length:', stringified.length);

    const reparsed = JSON.parse(stringified);
    console.log('✅ JSON.parse works, array length:', reparsed.length);

    // Test external JSON files
    let validCount = 0;
    let invalidCount = 0;
    let missingCount = 0;

    default_source_data.forEach((item, index) => {
        if (item.filePath) {
            const fullPath = path.join(process.cwd(), item.filePath);
            try {
                if (fs.existsSync(fullPath)) {
                    const fileContent = fs.readFileSync(fullPath, 'utf8');
                    JSON.parse(fileContent); // Validate JSON
                    validCount++;
                } else {
                    console.log(`❌ Missing file: ${item.filePath}`);
                    missingCount++;
                }
            } catch (error) {
                console.log(`❌ Invalid JSON in ${item.fileName}: ${error.message}`);
                invalidCount++;
            }
        } else if (item.fileData && item.fileData.startsWith('data:application/json;base64,')) {
            // Fallback for base64 data
            const base64Data = item.fileData.split(',')[1];
            try {
                const decoded = Buffer.from(base64Data, 'base64').toString('utf8');
                JSON.parse(decoded);
                validCount++;
            } catch (error) {
                console.log('❌ Invalid base64 data in item', index, item.name, error.message);
                invalidCount++;
            }
        }
    });

    console.log(`✅ External JSON validation: ${validCount} valid, ${invalidCount} invalid, ${missingCount} missing`);

    // Test specific data we just added
    const productInfoData = default_source_data.find(item => item.id === 1755270000013);
    if (productInfoData) {
        console.log('✅ Product Information data found:', productInfoData.name);
        if (productInfoData.filePath) {
            const fullPath = path.join(process.cwd(), productInfoData.filePath);
            if (fs.existsSync(fullPath)) {
                const fileContent = fs.readFileSync(fullPath, 'utf8');
                const parsed = JSON.parse(fileContent);
                console.log('✅ Product Information data sample:', parsed[0]);
            }
        }
    }

} catch (error) {
    console.log('❌ Error:', error.message);
    console.log('Stack:', error.stack);
}
