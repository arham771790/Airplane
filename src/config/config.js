import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Needed because __dirname doesn't exist in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, './config.json');

// Read and parse the JSON file
const configData = await fs.readFile(configPath, 'utf-8');
const config = JSON.parse(configData);

export default config;
