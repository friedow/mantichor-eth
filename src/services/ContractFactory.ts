import path from 'path';
import HbsCompiler from '@/services/HbsCompiler';
import SolCompiler from '@/services/SolCompiler';
import GanacheAdaper from '@/services/GanacheAdapter';

export default class ContractCreator {

  public static async deployChoreographyContract(): Promise<string> {
    const contractsPath = path.resolve(__dirname, '../contracts');
    const contractFileName = 'choreography.sol.hbs';
    const contractPath = path.resolve(contractsPath, contractFileName);
    const partialsPath = path.resolve(contractsPath, 'partials');

    console.log('=========================');
    const contractCode = HbsCompiler.compile(contractPath, partialsPath);
    console.log('Generated solidity code:');
    console.log(contractCode);

    console.log('=========================');
    const compiledSolConfig = SolCompiler.compile(contractFileName, contractCode);
    console.log('Compiled solidity config:');
    console.log(compiledSolConfig);

    console.log('=========================');
    const ganacheAdapter = new GanacheAdaper();
    const account = await ganacheAdapter.getDefaultAccount();
    const contractAddresses = await ganacheAdapter.deployContracts(compiledSolConfig.contracts, account);
    for (const contractAddress of contractAddresses) {
      console.log(`Contract deployed at ${contractAddress}`);
    }

    return contractAddresses[0];
  }

}
