import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, 'clairapp_omega_dipps.log');

export const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${message}\n`;
    fs.appendFileSync(logFilePath, logEntry, { encoding: 'utf8' });
};

export const getLogs = () => {
    return fs.readFileSync(logFilePath, { encoding: 'utf8' });
};
