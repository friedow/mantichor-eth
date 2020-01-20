const solc = require('solc');

export default class SolCompiler {

    private static createSolConfig(contractFileName: string, contractCode: string): any {
        return {
            language: 'Solidity',
            sources: {
                contractFileName: {
                    content: contractCode
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

    public static compile(contractFileName: string, contractCode: string): any {
        const solConfig = SolCompiler.createSolConfig(contractFileName, contractCode);
        try {
            return JSON.parse(solc.compile(JSON.stringify(solConfig)));
        } catch (e) {
            console.log(e);
        }
    }

    // constructor() {
    //     const SolConfig = SolCompiler.cr();
    //     const compiledSol = SolCompiler.compile(SolConfig);

    //     const contracts = compiled.contracts;
    //     for (const contractGroup in contracts) {
    //         for (const contractName in contracts[contractGroup]) {
    //             console.log(contracts[contractGroup][contractName])
    //             this.deploy(contracts[contractGroup][contractName]);
    //         }
    //     }
    // }

}
