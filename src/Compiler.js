const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

class Compiler {
    constructor() {
        buildPath = this.compilingPreperations();
        config = this.createConfiguration();
        compiled = this.compileSources(config);
        for (contractName in comp) {

        }
    }

    compilingPreperations() {
        const buildPath = path.resolve(__dirname, 'build');
        fs.removeSync(buildPath);
        return buildPath;
    }

    createConfiguration() {
        return {
            language: 'Solidity',
            sources: {
                'Testcontract.sol': {
                    content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'Testcontract.sol'), 'utf8')
                },
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            }
        };
    }

    compileSources(config) {
        try {
            return JSON.parse(solc.compile(JSON.stringify(config)));
        } catch (e) {
            console.log(e);
        }
    }
}

new Compiler();