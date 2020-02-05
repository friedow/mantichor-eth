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
      const compiledSolConfig = JSON.parse(solc.compile(JSON.stringify(solConfig)));
      if (compiledSolConfig.errors) {
        console.log('=========================');
        console.log('Solidity compiler warnings and errors:');
        console.log(compiledSolConfig.errors);
      }


      const contracts: any = Object.values(compiledSolConfig.contracts)[0];
      return Object.values(contracts)[0];
    } catch (e) {
      console.log(e);
    }
  }

}
