#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Verifying naming consistency...\n');

const oldName = 'Clair';
const newName = 'Clair';

function scanDirectory(dir) {
    const results = {
        needsUpdate: [],
        verified: [],
        errors: []
    };

    try {
        const files = readdirSync(dir);
        
        files.forEach(file => {
            const fullPath = join(dir, file);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                // Skip node_modules and .git directories
                if (file !== 'node_modules' && file !== '.git') {
                    const subResults = scanDirectory(fullPath);
                    results.needsUpdate = results.needsUpdate.concat(subResults.needsUpdate);
                    results.verified = results.verified.concat(subResults.verified);
                    results.errors = results.errors.concat(subResults.errors);
                }
            } else {
                // Check file content for old name references
                try {
                    const content = readFileSync(fullPath, 'utf8');
                    if (content.includes(oldName)) {
                        results.needsUpdate.push(fullPath);
                    } else {
                        results.verified.push(fullPath);
                    }
                } catch (error) {
                    results.errors.push({ file: fullPath, error: error.message });
                }
            }
        });
    } catch (error) {
        results.errors.push({ file: dir, error: error.message });
    }

    return results;
}

// Generate report
function generateReport(results) {
    const report = `
# Naming Consistency Report
Generated on: ${new Date().toISOString()}

## Files Needing Updates
${results.needsUpdate.map(file => `- ❌ ${file}`).join('\n')}

## Verified Files
${results.verified.map(file => `- ✅ ${file}`).join('\n')}

## Errors Encountered
${results.errors.map(error => `- ⚠️ ${error.file}: ${error.error}`).join('\n')}

## Summary
- Total files checked: ${results.verified.length + results.needsUpdate.length}
- Files needing updates: ${results.needsUpdate.length}
- Files verified: ${results.verified.length}
- Errors: ${results.errors.length}

## Next Steps
${results.needsUpdate.length > 0 
    ? '1. Update the files listed above to use the new name\n2. Run this verification again'
    : 'All files have been verified! No updates needed.'}

---
Report generated by naming verification script
`;

    writeFileSync('naming_verification_report.md', report);
    console.log('📝 Report generated: naming_verification_report.md');
}

// Run verification
console.log('Scanning directories...');
const results = scanDirectory('.');
generateReport(results);

if (results.needsUpdate.length > 0) {
    console.log('\n⚠️ Some files need to be updated. Check the report for details.');
    process.exit(1);
} else {
    console.log('\n✅ All files verified successfully!');
}
