#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE_PATH = '/project/sandbox/user-workspace/blackboxai-1743901004538/maryse-turcotte';

const filesToUpdate = [
    'backend/docs/functionality_transfer.md',
    'backend/index.js',
    'backend/package.json',
    'backend/scripts/verify_naming.js',
    'start.sh',
    'ui/index.html',
    'ui/package.json',
    'web/character.html',
    'web/index.html',
    'web/test.html'
];

const replacements = [
    {
        from: 'Maryse Turcotte',
        to: 'Clair'
    },
    {
        from: 'maryse-turcotte',
        to: 'clair'
    },
    {
        from: 'MaryseTurcotte',
        to: 'Clair'
    }
];

console.log('🔄 Starting name updates...\n');

function updateFile(filePath) {
    try {
        const fullPath = join(BASE_PATH, filePath);
        console.log(`Processing ${fullPath}...`);
        let content = readFileSync(fullPath, 'utf8');
        let updated = false;

        replacements.forEach(({ from, to }) => {
            if (content.includes(from)) {
                content = content.replace(new RegExp(from, 'g'), to);
                updated = true;
            }
        });

        if (updated) {
            writeFileSync(fullPath, content);
            console.log(`✅ Updated ${filePath}`);
        } else {
            console.log(`ℹ️ No changes needed in ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Process all files
filesToUpdate.forEach(file => {
    updateFile(file);
});

console.log('\n✨ Name updates completed!');
console.log('Please run the verification script again to confirm all updates.');
