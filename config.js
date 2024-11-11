// config.js

module.exports = {
    action: process.env.ACTION || 'disassemble', // 'assemble' для сборки, 'disassemble' для разбора
    projectDir: process.env.PROJECT_DIR || './output/assemble', // Путь до директории проекта
    outputDir: process.env.OUTPUT_DIR || './output', // Путь до директории, куда положить результат
    lineLengthLimit: parseInt(process.env.LINE_LENGTH_LIMIT) || 800, // Лимит длины строки файла, добавляемой в результат сборки project.md
    ignorePatterns: process.env.IGNORE_PATTERNS ? process.env.IGNORE_PATTERNS.split(',') : ['.git', 'output'], // Паттерны для игнорирования файлов
};
