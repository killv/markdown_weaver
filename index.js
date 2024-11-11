// index.js

const config = require('./config');
const assembleProject = require('./assemble');
const disassembleProject = require('./disassemble');

const actions = {
    'assemble': assembleProject,
    'disassemble': disassembleProject,
};

function main() {
    actions[config.action]();
}

main();
