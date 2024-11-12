const fs = require('fs');
const path = require('path');

function collectFilesInfo(dir, ignorePatterns) {
    const filesInfo = [];

    function traverseDirectory(currentDir) {
        const files = fs.readdirSync(currentDir);

        files.forEach(file => {
            const filePath = path.join(currentDir, file);
            const relativePath = path.relative(dir, filePath);

            if (shouldIgnoreFile(relativePath, ignorePatterns)) {
                console.log(`Ignoring: ${relativePath}`);
                return;
            }

            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                traverseDirectory(filePath);
            } else {
                filesInfo.push(relativePath);
            }
        });
    }

    traverseDirectory(dir);
    return filesInfo;
}

function shouldIgnoreFile(file, ignorePatterns) {
    return ignorePatterns.some(pattern => new RegExp(pattern).test(file));
}

function saveFilesInfoToMarkdown(filesInfo, outputFilePath) {
    const content = `# Карта проекта\n\n\`\`\`json\n${JSON.stringify(filesInfo, null, 2)}\n\`\`\`\n`;
    fs.writeFileSync(outputFilePath, content);
    console.log(`Project map saved to: ${outputFilePath}`);
}

// Пример использования:
const projectDir = './';
const ignorePatterns = ['.git', 'node_modules'];
const filesInfo = collectFilesInfo(projectDir, ignorePatterns);
const outputFilePath = './project.md';
saveFilesInfoToMarkdown(filesInfo, outputFilePath);