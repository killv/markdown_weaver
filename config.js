// config.js
const fs = require('fs');

const config = {
    action: process.env.ACTION || 'assemble', // 'assemble' to create single file project.md, 'disassemble' to create project from single file project.md
    projectDir: process.env.PROJECT_DIR || './', // './output/assemble', // Path to project dir
    outputDir: process.env.OUTPUT_DIR || './output', // Path to dir that should contain result
    lineLengthLimit: parseInt(process.env.LINE_LENGTH_LIMIT) || 800, // File length limit, added to result of assemble project.md
    ignorePatterns: process.env.IGNORE_PATTERNS ? process.env.IGNORE_PATTERNS.split(',') : ['.git', 'output'], // Ignored files and dirs
};

if (!['assemble', 'disassemble'].includes(config.action)) {
    console.error(`Unknown action: "${config.action}". Use "assemble" or "disassemble".`);
    process.exit(1);
}

if (!fs.existsSync(config.projectDir)) {
    console.error(`Directory not exist: ${config.projectDir}`);
    process.exit(1);
}

module.exports = config;
