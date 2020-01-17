const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const Web3 = require('web3');
const ganache = require("ganache-core");

class Compiler {
    constructor() {
        const buildPath = this.compilingPreperations();
        const config = this.createConfiguration();
        const compiled = this.compileSources(config);
        console.log(compiled);
        const contracts = compiled.contracts;
        for (const contractGroup in contracts) {
            for (const contractName in contracts[contractGroup]) {
                console.log(contracts[contractGroup][contractName])
                this.deploy(contracts[contractGroup][contractName]);
            }
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

    async deploy(contract) {
        const web3 = new Web3(ganache.provider());
        const accounts = await web3.eth.getAccounts();
        const deployedContract = await new web3.eth.Contract(contract.abi)
            .deploy({
                data: '0x' + contract.evm.bytecode.object,
                arguments: [3]
            })
            .send({
                from: accounts[0],
                gas: '2000000'
            });

        console.log(`Contract deployed at address: ${deployedContract.options.address}`);
    }
}

new Compiler();