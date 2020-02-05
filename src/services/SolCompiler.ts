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

}
