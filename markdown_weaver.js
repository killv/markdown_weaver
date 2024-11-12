const fs = require('fs');
const path = require('path');

// Функция для сбора информации о файлах
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

// Функция для проверки игнорирования файлов
function shouldIgnoreFile(file, ignorePatterns) {
    return ignorePatterns.some(pattern => new RegExp(pattern).test(file));
}

// Функция для создания строки с картой проекта
function createProjectMap(filesInfo) {
    return `# Карта проекта\n\n\`\`\`json\n${JSON.stringify(filesInfo, null, 2)}\n\`\`\`\n`;
}

// Функция для сбора содержимого файлов
function collectFileContents(filesInfo, baseDir) {
    const filesInfoFull = [];

    filesInfo.forEach(file => {
        const filePath = path.join(baseDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const fileType = path.extname(file).substring(1); // Убираем точку из расширения
        filesInfoFull.push([file, fileContent, fileType]);
    });

    return filesInfoFull;
}

// Функция для создания строки с содержимым файлов
function createProjectContent(filesInfoFull) {
    let projectContent = '';

    filesInfoFull.forEach(([file, content, fileType]) => {
        projectContent += `
## ${file}
\`\`\`${fileType}
${content}
\`\`\`
`;
    });

    return projectContent;
}

// Функция для сохранения результата в файл
function saveToFile(content, outputFilePath) {
    fs.writeFileSync(outputFilePath, content);
    console.log(`Result saved to: ${outputFilePath}`);
}

// Пример использования:
const projectDir = './';
const ignorePatterns = ['.DS_Store', '.git', 'node_modules', 'project.md'];
const filesInfo = collectFilesInfo(projectDir, ignorePatterns);
console.log('Files Info:', filesInfo);

const projectMap = createProjectMap(filesInfo);
const filesInfoFull = collectFileContents(filesInfo, projectDir);

const projectContent = createProjectContent(filesInfoFull);
const finalContent = projectMap + projectContent;

const outputFilePath = './project.md';
saveToFile(finalContent, outputFilePath);
