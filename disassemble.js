// disassemble.js

const fs = require('fs');
const path = require('path');
const config = require('./config');

function disassembleProject() {
    console.log('Начинаем разбор проекта...');

    const outputDir = path.join(config.outputDir, 'disassemble');
    const projectFilePath = path.join(config.projectDir, 'project.md');
    const projectContent = fs.readFileSync(projectFilePath, 'utf8');

    // Очищаем директорию назначения перед разборкой
    if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    // Разделяем содержимое по заголовкам
    const files = projectContent.split(/# (.+?)\n\n\`\`\`markdown\n/);

    // Пропускаем первый элемент, так как он будет пустым
    for (let i = 1; i < files.length; i += 2) {
        const relativePath = files[i];
        const fileContent = files[i + 1].split('\n\`\`\`\n')[0];

        const filePath = path.join(outputDir, relativePath);
        const fileDir = path.dirname(filePath);

        // Создаем директорию, если она не существует
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
        }

        fs.writeFileSync(filePath, fileContent);
    }

    console.log(`Проект успешно разобран. Результат сохранен в ${outputDir}`);
}

module.exports = disassembleProject;
