+#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filesToUpdate = [
    'blackboxai-1743901004538/maryse-turcotte/backend/docs/functionality_transfer.md',
    'blackboxai-1743901004538/maryse-turcotte/backend/index.js',
    'blackboxai-1743901004538/maryse-turcotte/backend/package.json',
    'blackboxai-1743901004538/maryse-turcotte/backend/scripts/verify_naming.js',
    'blackboxai-1743901004538/maryse-turcotte/start.sh',
    'blackboxai-1743901004538/maryse-turcotte/ui/index.html',
    'blackboxai-1743901004538/maryse-turcotte/ui/package.json',
    'blackboxai-1743901004538/maryse-turcotte/web/character.html',
    'blackboxai-1743901004538/maryse-turcotte/web/index.html',
    'blackboxai-1743901004538/maryse-turcotte/web/test.html'
];

