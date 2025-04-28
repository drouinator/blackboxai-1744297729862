#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const BASE_PATH = '/project/sandbox/user-workspace/blackboxai-1743901004538';
const OLD_DIR = 'maryse-turcotte';
const NEW_DIR = 'clair';

console.log('🚀 Starting migration to Clair...\n');

// Create new directory structure
console.log('Creating new directory structure...');
const directories = [
    'backend',
    'backend/docs',
    'backend/scripts',
    'backend/tests',
    'ui',
    'web'
];

directories.forEach(dir => {
    const newPath = join(BASE_PATH, NEW_DIR, dir);
    if (!existsSync(newPath)) {
        mkdirSync(newPath, { recursive: true });
        console.log(`✅ Created directory: ${newPath}`);
    }
});

// Define replacements
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
    },
    {
        from: '/maryse-turcotte/',
        to: '/clair/'
    }
];

// Function to update file content
function updateFileContent(content) {
    let updatedContent = content;
    replacements.forEach(({ from, to }) => {
        updatedContent = updatedContent.replace(new RegExp(from, 'g'), to);
    });
    return updatedContent;
}

// Function to migrate a file
function migrateFile(oldPath, newPath) {
    try {
        console.log(`Migrating ${oldPath} to ${newPath}...`);
        
        // Create directory if it doesn't exist
        const dir = dirname(newPath);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        // Read and update content
        const content = readFileSync(oldPath, 'utf8');
        const updatedContent = updateFileContent(content);
        
        // Write to new location
        writeFileSync(newPath, updatedContent);
        console.log(`✅ Migrated: ${oldPath}`);
    } catch (error) {
        console.error(`❌ Error migrating ${oldPath}:`, error.message);
    }
}

// List of files to migrate
const filesToMigrate = [
    'backend/README.md',
    'backend/clairapp_installation_instructions.md',
    'backend/clairapp_live_deployment_instructions.md',
    'backend/commands.js',
    'backend/index.js',
    'backend/integration_summary.md',
    'backend/logging.js',
    'backend/package.json',
    'backend/systemStats.js',
    'backend/voice.js',
    'backend/docs/architecture.md',
    'backend/docs/functionality_transfer.md',
    'backend/docs/vscode_setup.md',
    'backend/scripts/setup.js',
    'backend/scripts/verify_installation.js',
    'backend/scripts/verify_naming.js',
    'backend/tests/integration_test.js',
    'ui/index.html',
    'ui/main.js',
    'ui/package.json',
    'ui/renderer.js',
    'web/character.html',
    'web/clair.html',
    'web/index.html',
    'web/styles.css',
    'web/test.html',
    'start.sh'
];

// Migrate all files
filesToMigrate.forEach(file => {
    const oldPath = join(BASE_PATH, OLD_DIR, file);
    const newPath = join(BASE_PATH, NEW_DIR, file);
    migrateFile(oldPath, newPath);
});

console.log('\n✨ Migration completed!');
console.log('Please verify the new directory structure and file contents.');
