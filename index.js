// index.js

const config = require('./config');
const assembleProject = require('./assemble');
const disassembleProject = require('./disassemble');

function main() {
    if (config.action === 'assemble') {
        assembleProject();
    } else if (config.action === 'disassemble') {
        disassembleProject();
    } else {
        console.error('Неизвестное действие. Используйте "assemble" или "disassemble".');
    }
}

main();
