// assemble.js

const fs = require('fs');
const path = require('path');
const config = require('./config');

function assembleProject() {
    console.log('Начинаем сборку проекта...');

    const outputDir = path.join(config.outputDir, 'assemble');
    const outputFilePath = path.join(outputDir, 'project.md');

    // Очищаем директорию назначения перед сборкой
    if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    let content = '';

    // Рекурсивная функция для обхода директорий
    function processDirectory(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const relativePath = path.relative(config.projectDir, filePath);

            if (shouldIgnoreFile(relativePath)) {
                console.log(`Игнорируем файл: ${relativePath}`);
                return;
            }

            if (fs.statSync(filePath).isDirectory()) {
                processDirectory(filePath);
            } else {
                try {
                    const fileContent = fs.readFileSync(filePath, 'utf8');

                    const formattedContent = fileContent.split('\n').map(line => {
                        if (line.length > config.lineLengthLimit) {
                            return line.substring(0, config.lineLengthLimit) + '...';
                        }
                        return line;
                    }).join('\n');

                    // Добавляем заголовок с полным путем и содержимое в блоке кода
                    content += `\n\n# ${relativePath}\n\n\`\`\`markdown\n${formattedContent}\n\`\`\`\n\n`;
                } catch (error) {
                    console.error(`Ошибка при чтении файла ${relativePath}:`, error.message);
                }
            }
        });
    }

    processDirectory(config.projectDir);

    fs.writeFileSync(outputFilePath, content);

    console.log(`Проект успешно собран. Результат сохранен в ${outputFilePath}`);
}

function shouldIgnoreFile(file) {
    return config.ignorePatterns.some(pattern => file.includes(pattern));
}

module.exports = assembleProject;
