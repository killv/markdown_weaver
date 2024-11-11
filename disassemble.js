// disassemble.js

const fs = require('fs');
const path = require('path');
const config = require('./config');

function disassembleProject() {
    console.log('Start dissassemble project...');

    const outputDir = path.join(config.outputDir, 'disassemble');
    const projectFilePath = path.join(config.projectDir, 'project.md');
    const projectContent = fs.readFileSync(projectFilePath, 'utf8');

    // Clean target dir before start
    if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    // Split by headers
    const files = projectContent.split(/# (.+?)\n\n\`\`\`markdown\n/);

    // Skip firs file because it's empty
    for (let i = 1; i < files.length; i += 2) {
        const relativePath = files[i];
        const fileContent = files[i + 1].split('\n\`\`\`\n')[0];

        const filePath = path.join(outputDir, relativePath);
        const fileDir = path.dirname(filePath);

        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
        }

        fs.writeFileSync(filePath, fileContent);
    }

    console.log(`Project ready in: ${outputDir}`);
}

module.exports = disassembleProject;
